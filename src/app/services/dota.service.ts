import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { dotaItem } from './item';
import { dotaHero } from './hero';
import { recentMatches } from './recentMatches';

@Injectable({
  providedIn: 'root'
})
export class DotaService {
  opendotaApiUrl: string = 'https://api.opendota.com/api/';
  dotaApiUrl: string = 'https://api.steampowered.com/IEconDOTA2_570/';
  language: string = 'en_US';
  dotaImageUrl: string = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images';
  heroPortrait: string = '/dota_react/heroes/';
  itemPortrait: string = '/items/';
  format: string = '.png';


  public dotaHeroList: any = [];
  public dotaItemList: any = [];

  constructor(private http: HttpClient) { }

  getHerolist() {
    let requestUrl = this.opendotaApiUrl + 'heroes';
    this.http.get<dotaHero[]>(requestUrl).subscribe(response => {
      this.dotaHeroList = response.sort(function(a, b){
        if(a.localized_name < b.localized_name) { return -1; }
        if(a.localized_name > b.localized_name) { return 1; }
        return 0;
      })
    });
  }

  getItemList() {
    let requestUrl = this.dotaApiUrl + 'GetGameItems/V001/' + 
      '?key=' + environment.steamApiKey + '&language=' + this.language;
    return this.http.get<dotaItem>(requestUrl).subscribe(res => {
      this.dotaItemList = res.result.items.sort(function(a, b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
      });
    });
  }

  getRecentMatches(playerId: number) {
    let requestUrl = this.opendotaApiUrl + 'players/' + playerId + '/recentMatches';
    return this.http.get<recentMatches[]>(requestUrl);
  }
}
