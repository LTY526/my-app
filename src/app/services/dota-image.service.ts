import { Injectable } from '@angular/core';
import { DotaService } from './dota.service';

@Injectable({
  providedIn: 'root'
})
export class DotaImageService {

  constructor(private dotaSvc: DotaService) { }

  getHeroPortrait(name: string) {
    let processedName = name.split("npc_dota_hero_");
    return `assets/heroes/${processedName[1]}.png`;
  }

  getHeroPortraitById(hero_id: number) {
    let res = this.dotaSvc.dotaHeroList.find((item: { id: number; }) => item.id == hero_id)!.name;
    return this.getHeroPortrait(res);
  }

  getItemPortrait(name: string) {
    if(name.includes('recipe')) {
      return 'assets/items/recipe.png'
    }
    let processedName = name.split("item_");
    return `assets/items/${processedName[1]}.png`;
  }

  getItemPortraitById(item_id: number) {
    if(item_id == 0) {
      return 'assets/FFFFFF.png'
    }
    let res = this.dotaSvc.dotaItemList.find((item: { id: number; }) => item.id == item_id)!.name;
    return this.getItemPortrait(res);
  }
}
