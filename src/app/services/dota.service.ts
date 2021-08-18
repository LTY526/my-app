import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { dotaItem, dotaItem2 } from './item';
import { dotaHero } from './hero';
import { profileInfo } from './profileInfo';
import { recentMatches, lobbyType, gameMode, matchDetail, player } from './recentMatches';
import LobbyType from './json/lobby-type.json';
import GameType from './json/game-mode.json'
import Hero from './json/hero.json';
import Item from './json/item.json';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DotaService {
  opendotaApiUrl: string = 'https://api.opendota.com/api/';

  //light-blue: imported, white: declared name, light-green: data type
  public lobbyT: any[] = LobbyType as lobbyType[];
  public gameM: any[] = GameType as gameMode[]
  public dotaHeroList: any[] = Hero as dotaHero[];
  
  public dotaItemList: any[] = Item as dotaItem2[];

  sub: Subscription = new Subscription;

  constructor(private http: HttpClient) { }

  getHerolist() {
    //try to not call
    if(this.dotaHeroList.length <= 0) {
      console.log("HeroList API called.");
      let requestUrl = this.opendotaApiUrl + 'heroes';
      this.http.get<dotaHero[]>(requestUrl).subscribe(response => {
        console.log(response);
        this.dotaHeroList = response.sort(function(a, b){
          if(a.localized_name < b.localized_name) { return -1; }
          if(a.localized_name > b.localized_name) { return 1; }
          return 0;
        })
      });
    } else {
      console.log("HeroList API not called")
      this.dotaHeroList.sort(function(a, b){
        if(a.localized_name < b.localized_name) { return -1; }
        if(a.localized_name > b.localized_name) { return 1; }
        return 0;
      })
    }
  }

  getItemList() {
    if(this.dotaItemList.length <= 0) {
      console.log("ItemList API called");
      let requestUrl = 'https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/?key='
       + environment.steamApiKey + '&language=en_US';
      this.http.get<dotaItem>(requestUrl).subscribe(res => {
        this.dotaItemList = res.result.items.sort(function(a, b){
          if(a.id < b.id) { return -1; }
          if(a.id > b.id) { return 1; }
          return 0;
        });
      });
    }else {
      console.log("ItemList API not called");
      this.dotaItemList.sort(function(a, b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
      });
    }
    
  }

  getRecentMatches(playerId: number) {
    let requestUrl = this.opendotaApiUrl + 'players/' + playerId + '/recentMatches';
    return this.http.get<recentMatches[]>(requestUrl);
  }

  getProfile(playerId: number) {
    let requestUrl = this.opendotaApiUrl + 'players/' + playerId;
    return this.http.get<profileInfo>(requestUrl);
  }

  getSixItems(matchID: number, uid: number) {
    let itemArr: number[] = [];
    let requestUrl = this.opendotaApiUrl + "matches/" + matchID;
    this.sub = this.http.get<matchDetail>(requestUrl).subscribe(res => {
      let plyr: player = res.players.find(player => player.account_id == uid)!;
      itemArr.push(plyr.item_0);
      itemArr.push(plyr.item_1);
      itemArr.push(plyr.item_2);
      itemArr.push(plyr.item_3);
      itemArr.push(plyr.item_4);
      itemArr.push(plyr.item_5);
    });
    return itemArr;
  }

  getGameModeName(gameModeID: number) {
    let result = this.gameM.find((item: { id: number; }) => item.id == gameModeID);
    return result.localized_name;
  }

  getLobbyTypeName(lobbyTypeID: number) {
    let result = this.lobbyT.find((item: { id: number; }) => item.id == lobbyTypeID);
    return result.localized_name;
  }

  getWinOrLose(player_slot: number, radiant_win: boolean) {
    let side = null;
    if(player_slot >= 0 && player_slot <=127) side = "radiant";
        else if(player_slot >= 128 && player_slot <= 255) side = "dire";
        else side = null;
    if(side == "radiant") {
        if(radiant_win == true) return true;
            else if(radiant_win == false) return false;
    } else if(side == "dire") {
        if(radiant_win == true) return false;
            else if(radiant_win == false) return true;
    }
    return false;
  }
}
