import { Component, OnInit } from '@angular/core';
import { DotaImageService } from '../services/dota-image.service';
import { DotaService } from '../services/dota.service';
import { HeroSearchService } from '../shared/hero-search.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  searchText: any;

  constructor(public dotaSvc: DotaService, public dotaImgSvc: DotaImageService, public heroSearch: HeroSearchService) { 
    this.dotaSvc.getHerolist();
    this.dotaSvc.getItemList();
    this.heroSearch.currentSearchText.subscribe(res => {
      this.searchText = res;
    })
    /*this.dotaSvc.getRecentMatches(316051778).subscribe(res => {
      console.log(res);
    });*/
  }

  ngOnInit(): void {
  }

  getAttributeName(primary_attr: string) {
    if(primary_attr == "str") return "Strength";
      else if(primary_attr == "agi") return "Agility";
      else if(primary_attr == "int") return "Intelligence";
      else return null;
  }

  goToWebsite(id: number) {
    let url = "https://www.opendota.com/heroes/" + id;
    window.open(url, "_blank");
  }
}

