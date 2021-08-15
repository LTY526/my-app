import { Injectable } from '@angular/core';
import { DotaService } from './dota.service';

@Injectable({
  providedIn: 'root'
})
export class DotaImageService {

  constructor(private dotaSvc: DotaService) { }

  getHeroPortrait(name: string) {
    let newname = name.split("npc_dota_hero_");
    let complete = this.dotaSvc.dotaImageUrl + this.dotaSvc.heroPortrait + newname[1] + this.dotaSvc.format;
    return complete;
  }

  getHeroPortraitById(hero_id: number) {
    let res = this.dotaSvc.dotaHeroList.find((item: { id: number; }) => item.id == hero_id);
    let result = this.getHeroPortrait(res.name);
    return result; 
  }

  getItemPortrait(name: string) {
    if(name.includes('recipe')) {
      return null;
    }
    let newname = name.split("item_");
    return this.dotaSvc.dotaImageUrl + this.dotaSvc.itemPortrait + newname[1] + '_lg' + this.dotaSvc.format;
  }

  getItemPortraitById(item_id: number) {
    if(item_id == 0) {
      return "https://www.colorcombos.com/images/colors/FFFFFF.png"
    }else {
      let res = this.dotaSvc.dotaItemList.find((item: { id: number; }) => item.id == item_id)
      let result = this.getItemPortrait(res.name);
      return result; 
    }
  }
}
