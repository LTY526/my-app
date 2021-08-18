import { Injectable } from '@angular/core';
import { DotaService } from './dota.service';

@Injectable({
  providedIn: 'root'
})
export class DotaImageService {

  constructor(private dotaSvc: DotaService) { }

  getHeroPortrait(name: string) {
    let newname = name.split("npc_dota_hero_");
    return 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/' + newname[1] + '.png';
  }

  getHeroPortraitById(hero_id: number) {
    let res = this.dotaSvc.dotaHeroList.find((item: { id: number; }) => item.id == hero_id);
    let result = this.getHeroPortrait(res.name);
    return result; 
  }

  getItemPortrait(name: string) {
    if(name.includes('recipe')) {
      return 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/recipe.png'
    }
    let newname = name.split("item_");
    return 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/' + newname[1] + '.png';
  }

  getItemPortraitById(item_id: number) {
    if(item_id == 0) {
      return '../../assets/FFFFFF.png'
    }else {
      let res = this.dotaSvc.dotaItemList.find((item: { id: number; }) => item.id == item_id)
      let result = this.getItemPortrait(res.name);
      return result; 
    }
  }
}
