import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemApiResponse, DotaItem } from '../models/item';
import { DotaHero } from '../models/hero';
import { ProfileInfo } from '../models/profileInfo';
import { RecentMatches, LobbyType, GameMode, MatchDetail, Player } from '../models/recentMatches';
import LobbyTypeJson from './json/lobby-type.json';
import GameModeJson from './json/game-mode.json'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DotaService {
  opendotaApiUrl = 'https://api.opendota.com/api';

  //light-blue: imported, white: declared name, light-green: data type
  public lobbyT: any[] = LobbyTypeJson as LobbyType[];
  public gameM: any[] = GameModeJson as GameMode[];

  fkingList: DotaItem[] = [];

  public dotaHeroList: DotaHero[] = [];
  public dotaItemList: DotaItem[] = [];

  sub = new Subscription;

  constructor(private http: HttpClient) { }

  getHerolist() {
    // try to not call actual api
    // let requestUrl = `${this.opendotaApiUrl}/heroes`;
    // this.http.get<DotaHero[]>(requestUrl);

    this.http.get<DotaHero[]>('./assets/hero.json').pipe(map(list => {
      this.dotaHeroList = list.sort(function(a, b){
        if(a.localized_name < b.localized_name) { return -1; }
        if(a.localized_name > b.localized_name) { return 1; }
        return 0;
      });
    })).subscribe();
  }

  getItemList() {
    // try to not call actual api
    // let requestUrl = `https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key=${environment.steamApiKey}&language=en_US`
    // this.http.get<ApiResponse>(requestUrl)

    this.http.get<ItemApiResponse>('./assets/item.json').pipe(map(x => {
      this.dotaItemList = x.result.items.sort(function(a, b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
      });
    })).subscribe()
  }

  getRecentMatches(playerId: number) {
    return this.http.get<RecentMatches[]>(`${this.opendotaApiUrl}/players/${playerId}/recentMatches`);
  }

  getProfile(playerId: number) {
    return this.http.get<ProfileInfo>(`${this.opendotaApiUrl}/players/${playerId}`);
  }

  getSixItems(matchID: number, uid: number) {
    let itemArr: number[] = [];
    let neutItem: number[] = [];
    this.sub = this.http.get<MatchDetail>(`${this.opendotaApiUrl}/matches/${matchID}`).pipe(map(x => {
      let p: Player = x.players.find(z => z.account_id == uid)!;
      itemArr.push(p.item_0, p.item_1, p.item_2, p.item_3, p.item_4, p.item_5, p.backpack_0, p.backpack_1, p.backpack_2);
      neutItem.push(p.item_neutral);
    })).subscribe();
    return [itemArr, neutItem];
  }

  getGameModeName(gameModeID: number) {
    return this.gameM.find((item: { id: number; }) => item.id == gameModeID).localized_name;
  }

  getLobbyTypeName(lobbyTypeID: number) {
    return this.lobbyT.find((item: { id: number; }) => item.id == lobbyTypeID).localized_name;
  }

  getWinOrLose(player_slot: number, radiant_win: boolean) {
    if (player_slot >= 0 && player_slot <=127) { // side = radiant
      return radiant_win == true ? true : false ;
    } else if (player_slot >= 128 && player_slot <= 255) { // side = dire
      return radiant_win == true ? false : true ;
    };
    return false;
  }

  // trydownload() {
  //   this.http.get<DotaHero[]>('./assets/hero.json').pipe(map(x => {
  //     let list: string[] = [];
  //     x.forEach(hero => {
  //       let newname = hero.name.split("npc_dota_hero_");
  //       list.push(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${newname[1]}.png`);
  //     });
  //     return list;
  //   })).subscribe(list => {
  //     console.log(JSON.stringify(list));
  //   })
  // }
}
