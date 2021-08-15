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

  uid: any;
  recent20Matches: any = [];
  recent20MatchesSub: Subscription = new Subscription;
  constructor(public dotaSvc: DotaService, public dotaImgSvc: DotaImageService) { }

  ngOnInit(): void {
    let arr = this.dotaSvc.getSixItems(6135135734, 216266355);
  }

  ngOnDestroy(): void {
    this.recent20MatchesSub.unsubscribe();
  }

  getRecent() {
    this.recent20MatchesSub = this.dotaSvc.getRecentMatches(this.uid).subscribe(res => {
      res.forEach(match => {
        this.recent20Matches.push(match);
        match.game_mode_name = this.dotaSvc.getGameModeName(match.game_mode);
        match.lobby_type_name = this.dotaSvc.getLobbyTypeName(match.lobby_type);
        match.items = this.dotaSvc.getSixItems(match.match_id, this.uid);
        match.hero_image = this.dotaImgSvc.getHeroPortraitById(match.hero_id);
      })
    });
  }
}
