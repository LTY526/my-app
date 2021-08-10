import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { DotaService } from '../services/dota.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  blogList: any = [];
  dotaHeroList: any = [];

  constructor(private blogSvc: BlogService, private dotaSvc: DotaService) { 
    /*this.blogSvc.getAllBlog().subscribe(response => {
      this.blogList = response;
    })*/
    this.dotaSvc.getAllHeroes().subscribe(response => {
      this.dotaHeroList = response.sort(function(a, b){
        if(a.localized_name < b.localized_name) { return -1; }
        if(a.localized_name > b.localized_name) { return 1; }
        return 0;
      })
      console.log(response);
    })
  }

  ngOnInit(): void {
  }

  getHeroImage(localized_name: string) {
    let newname = localized_name.split("npc_dota_hero_");
    return "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + newname[1] + ".png";
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

