import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DotaImageService } from '../services/dota-image.service';
import { DotaService } from '../services/dota.service';

@Component({
  selector: 'app-recent-matches',
  templateUrl: './recent-matches.component.html',
  styleUrls: ['./recent-matches.component.scss']
})
export class RecentMatchesComponent implements OnInit, OnDestroy{

  today: any;
  uid: any;
  savedUid: any = null;
  recent20Matches: any = [];
  recent20MatchesSub: Subscription = new Subscription;

  playerProfileSub: Subscription = new Subscription;
  profileName: string = "";
  profilePersonaName: string = "";
  profilePic: string = "";
  profileUrl: string = "";
  personUid: any;
  godMode: boolean = false;

  constructor(public dotaSvc: DotaService, public dotaImgSvc: DotaImageService) { }

  ngOnInit(): void {
    this.today = new Date().getTime();
    this.savedUid = localStorage.getItem("savedUid");
  }

  ngOnDestroy(): void {
    this.recent20MatchesSub.unsubscribe();
    this.playerProfileSub.unsubscribe();
    this.profileName = "";
    this.profilePersonaName = "";
    this.profilePic = "";
    this.profileUrl = "";
    this.personUid = null;
  }

  reset() {
    this.today = new Date().getTime();
    this.recent20Matches.length = 0;
    this.profileName = ""
  }

  skillBracketStyle(skillNum: number) {
    if(!skillNum) {
      return 'color: grey; font-weight:500;';
    } else if(skillNum == 1) {
      return 'color: grey; font-weight:500;'
    } else if(skillNum == 2) {
      return 'color: black; font-weight:500;'
    } else if(skillNum == 3) {
      return 'color: #CCB612; font-weight:500;'
    } else return;
  }

  skillBracketLabel(skillNum: number) {
    if(!skillNum) {
      return 'U';
    } else if(skillNum == 1) {
      return 'N'
    } else if(skillNum == 2) {
      return 'H'
    } else if(skillNum == 3) {
      return 'VH'
    } else return;
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
    this.playerProfileSub = this.dotaSvc.getProfile(this.uid).subscribe(res => {
      this.profileName = res.profile.name;
      this.profilePersonaName = res.profile.personaname;
      this.profilePic = res.profile.avatarfull;
      this.profileUrl = res.profile.profileurl;
      this.personUid = res.profile.account_id;
    });
    this.recent20MatchesSub = this.dotaSvc.getRecentMatches(this.uid).subscribe(res => {
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
    });
    localStorage.setItem("savedUid", this.uid);
    this.savedUid = localStorage.getItem("savedUid");
  }

  convertUnixTimestamp(start_time: number) {
    let diff = Math.abs(this.today - new Date(start_time * 1000).getTime());
    let diffInMin = diff / 60000;
    let diffInHour = diff / 3600000;
    let diffInDay = diff/ 86400000
    let diffInMonth = diff / 2628000000;

    let diffInMinS = diffInMin.toString();
    let diffInHourS = diffInHour.toString();
    let diffInDayS = diffInDay.toString()
    let diffInMonthS = diffInMonth.toString();
    
    if(diffInMin <= 60) {
      return diffInMinS.slice(0, (diffInMinS.indexOf("."))) + " Minute(s) ago";

    } else if(diffInMin > 60 && diffInHour <= 24) {
        return diffInHourS.slice(0, (diffInHourS.indexOf("."))) + " Hour(s) ago";

    } else if(diffInHour > 24 && diffInDay <= 30) {
        return diffInDayS.slice(0, (diffInDayS.indexOf("."))) + " Day(s) ago";

    } else if(diffInDay > 30) {
        return diffInMonthS.slice(0, (diffInMonthS.indexOf("."))) + " Month(s) ago";

    } else {
        return diffInMonthS.slice(0, (diffInMonthS.indexOf("."))) + " Month(s) ago";
    }
  }

  calculateDuration(duration: number) {
    return Math.floor(duration % 3600 / 60);
  }

  goToDetailWebsite(matchId: number, selection: number) {
    if(selection == 1) {
      let url = "https://www.dotabuff.com/matches/" + matchId;
      window.open(url, "_blank");
    } else if(selection == 2) {
      let url = "https://www.opendota.com/matches/" + matchId;
      window.open(url, "_blank");
    } else return;
  }

  goToPlayerWebsite(uid: number, selection: number) {
    if(selection == 1) {
      let url = "https://www.dotabuff.com/players/" + uid;
      window.open(url, "_blank");
    } else if(selection == 2) {
      let url = "https://www.opendota.com/players/" + uid;
      window.open(url, "_blank");
    } else if(selection == 3) {
      let url = this.profileUrl;
      window.open(url, "_blank");
    } else return;
  }
}
