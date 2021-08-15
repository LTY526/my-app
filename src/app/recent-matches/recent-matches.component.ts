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
  savedUid: any;
  recent20Matches: any = [];
  recent20MatchesSub: Subscription = new Subscription;

  playerProfileSub: Subscription = new Subscription;
  profileName: string = "";
  profilePersonaName: string = "";
  profilePic: string = "";
  profileUrl: string = "";
  personUid: any;

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
    this.recent20Matches.length = 0;
    this.profileName = ""
  }

  getRecent(savedUid?: string) {
    this.reset();
    if(savedUid) {
      this.uid = savedUid;
    }
    this.playerProfileSub = this.dotaSvc.getProfile(this.uid).subscribe(res => {
      this.profileName = res.profile.name;
      this.profilePersonaName = res.profile.personaname;
      this.profilePic = res.profile.avatarfull;
      this.profileUrl = res.profile.profileurl;
      this.personUid = res.profile.account_id;
      console.log(res.profile)
    });
    this.recent20MatchesSub = this.dotaSvc.getRecentMatches(this.uid).subscribe(res => {
      res.forEach(match => {
        this.recent20Matches.push(match);
        match.game_mode_name = this.dotaSvc.getGameModeName(match.game_mode);
        match.lobby_type_name = this.dotaSvc.getLobbyTypeName(match.lobby_type);
        match.items = this.dotaSvc.getSixItems(match.match_id, this.uid);
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
    
    if(diffInMin <= 60) {
      return diffInMin.toFixed(0) + " Minute(s) ago";

    } else if(diffInMin > 60 && diffInHour <= 24) {
        return diffInHour.toFixed(0) + " Hour(s) ago";

    } else if(diffInHour > 24 && diffInDay <= 30) {
        return diffInDay.toFixed(0) + " Day(s) ago";

    } else if(diffInDay > 30) {
        return diffInMonth.toFixed(0) + " Month(s) ago";

    } else {
        return diffInMonth.toFixed(0) + " Month(s) ago";
    }
  }

  calculateDuration(duration: number) {
    var h = Math.floor(duration % (3600*24) / 3600);
    var m = Math.floor(duration % 3600 / 60);
    var s = Math.floor(duration % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? m + ":" : "";
    var sDisplay = s > 0 ? s + "" : "";
    return hDisplay + mDisplay + sDisplay;
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
