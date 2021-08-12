import { Injectable } from '@angular/core';
import { DotaService } from './dota.service';

@Injectable({
  providedIn: 'root'
})
export class DotaImageService {

  constructor(private dotaSvc: DotaService) { }

  getHeroPortrait(localized_name: string) {
    let newname = localized_name.split("npc_dota_hero_");
    return this.dotaSvc.dotaImageUrl + this.dotaSvc.heroPortrait + newname[1] + this.dotaSvc.format;
  }

  getItemPortrait(localized_name: string) {
    if(localized_name.includes('recipe')) {
      return null;
    }
    let newname = localized_name.split("item_");
    return this.dotaSvc.dotaImageUrl + this.dotaSvc.itemPortrait + newname[1] + '_lg' + this.dotaSvc.format;
  }
}
