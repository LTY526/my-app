import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DotaImageService {

  backendURL = environment.backendURL;

  constructor() { }

  getHeroPortrait(name: string) {
    return `${this.backendURL}/heroes/byname/${name}`;
  }

  getHeroPortraitById(hero_id: number) {
    return `${this.backendURL}/heroes/byid/${hero_id}`;
  }

  getItemPortrait(name: string) {
    return `${this.backendURL}/items/byname/${name}`;
  }

  getItemPortraitById(item_id: number) {
    if(item_id == 0) {
      return 'assets/FFFFFF.png'
    }
    return `${this.backendURL}/items/byid/${item_id}`;
  }
}
