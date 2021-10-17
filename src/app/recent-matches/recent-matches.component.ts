import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DotaImageService } from '../services/dota-image.service';
import { DotaService } from '../services/dota.service';
import * as datefns from 'date-fns';
import { map } from 'rxjs/operators';
import { SimplifiedProfile } from '../models/profileInfo';
import { UidLocalStorage } from '../models/uidLocalStorage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-matches',
  templateUrl: './recent-matches.component.html',
  styleUrls: ['./recent-matches.component.scss']
})
export class RecentMatchesComponent implements OnInit, OnDestroy{

  skillList = new Map([
    [0, 'U'],
    [1, 'N'],
    [2, 'H'],
    [3, 'VH']
  ]);

  skillColorList = new Map([
    [0, 'color: grey; font-weight:500'],
    [1, 'color: grey; font-weight:500'],
    [2, 'color: black; font-weight:500'],
    [3, 'color: #CCB612; font-weight:500']
  ]);

  detailWebsiteList = new Map([
    [1, 'https://www.dotabuff.com/matches'],
    [2, 'https://www.opendota.com/matches']
  ]);

  detailPlayerWebsiteList = new Map([
    [1, 'https://www.dotabuff.com/players'],
    [2, 'https://www.opendota.com/players'],
    [3, '']
  ]);

  today: any;
  uid: any;

  uidObject: UidLocalStorage = {}
  olduidList: any = [];
  recent20Matches: any[] = [];
  recent20MatchesSub: Subscription = new Subscription;

  playerProfileSub: Subscription = new Subscription;
  simplifiedProfile: SimplifiedProfile = {};
  godMode: boolean = false;

  constructor(
    public dotaSvc: DotaService, 
    public dotaImgSvc: DotaImageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.today = new Date();
    this.uidObject = JSON.parse(localStorage.getItem("list") || '{}');
    console.log(this.uidObject.list)
  }

  ngOnDestroy(): void {
    this.recent20MatchesSub.unsubscribe();
    this.playerProfileSub.unsubscribe();
  }

  reset() {
    this.today = new Date().getTime();
    this.recent20Matches.length = 0;
  }

  skillBracketStyle(skillNum: number) {
    return this.skillColorList.get(skillNum?? 0) ?? '';
  }

  skillBracketLabel(skillNum: number) {
    return this.skillList.get(skillNum?? 0) ?? 'U';
  }

  enableGodMode() {
    this.godMode = true;
  }

  getRecent(savedUid?: number) {
    this.reset();
    if(savedUid) {
      this.uid = savedUid;
    }
    if(this.uid == 999999999 ) {
      this.enableGodMode();
      return;
    }
    this.playerProfileSub = this.dotaSvc.getProfile(this.uid).pipe(map(x => {
      let entry: SimplifiedProfile = {
        profileName: x.profile.name,
        profilePersonaName: x.profile.personaname,
        profilePic: x.profile.avatarfull,
        profileUrl: x.profile.profileurl,
        personUid: x.profile.account_id,
      };
      return entry;
    })).subscribe(res => {
      this.simplifiedProfile = res;
    })

    this.recent20MatchesSub = this.dotaSvc.getRecentMatches(this.uid).subscribe(
      res => {
        res.forEach(match => {
          this.recent20Matches.push(match);
          match.game_mode_name = this.dotaSvc.getGameModeName(match.game_mode);
          match.lobby_type_name = this.dotaSvc.getLobbyTypeName(match.lobby_type);
          let itemCombo = this.dotaSvc.getSixItems(match.match_id, this.uid);
          match.items = itemCombo[0];
          match.neutral_item = itemCombo[1];
          match.win = this.dotaSvc.getWinOrLose(match.player_slot, match.radiant_win);
          match.hero_image = this.dotaImgSvc.getHeroPortraitById(match.hero_id);
        })
      },
      error => {
        this.toastr.error('Slow down bro, try again later.');
      }
    );
    this.saveUid(this.uid);
  }

  convertUnixTimestamp(start_time: number, duration_in_seconds: number) {
    let start_time_converted = datefns.fromUnixTime(start_time);
    let end_time = datefns.addSeconds(start_time_converted, duration_in_seconds);
    let diffInMin = datefns.differenceInMinutes(this.today, end_time);
    let diffInHour = datefns.differenceInHours(this.today, end_time);
    let diffInDay = datefns.differenceInDays(this.today, end_time)
    let diffInMonth = datefns.differenceInMonths(this.today, end_time);
    
    if(diffInMin <= 60) {
      return `${diffInMin} Minute(s) ago`;
    } else if(diffInMin > 60 && diffInHour <= 24) {
      return `${diffInHour} Hours(s) ago`;
    } else if(diffInHour > 24 && diffInDay <= 30) {
      return `${diffInDay} Day(s) ago`;
    } else if(diffInDay > 30) {
      return `${diffInMonth} Month(s) ago`;
    }
    return `${diffInMonth} Month(s) ago`;
  }

  calculateDuration(duration: number) {
    return Math.floor(duration / 60);
  }

  goToDetailWebsite(matchId: number, selection: number) {
    let url = `${this.detailWebsiteList.get(selection)}/${matchId}`;
    window.open(url, "_blank");
  }

  goToPlayerWebsite(uid: number, selection: number) {
    if(selection == 3) {
      var url = this.simplifiedProfile.profileUrl!;
    } else var url = `${this.detailPlayerWebsiteList.get(selection)}/${uid}`;
    window.open(url, "_blank");
  }

  saveUid(uid: number) {
    if(this.uidObject.list){
      if(this.uidObject.list!.find(x => x.uid == this.uid)) return;
      if(this.uidObject.list!.length < 5){ // 0 1 2 3 4
        this.uidObject.list!.unshift({
          uid: uid
        });
      } else {
        this.uidObject.list!.pop();
        this.uidObject.list!.unshift({
          uid: uid
        });
      }
    } else {
      this.uidObject.list = [{
        uid: uid,
      }];
    }
    localStorage.setItem("list", JSON.stringify(this.uidObject));
    this.uidObject = JSON.parse(localStorage.getItem("list") || '{}');
  }
}
