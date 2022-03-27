import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DotaItem } from '../models/item';
import { DotaHero } from '../models/hero';
import { ProfileInfo } from '../models/profileInfo';
import { RecentMatches, LobbyType, GameMode, MatchDetail, Player } from '../models/recentMatches';
import LobbyTypeJson from './json/lobby-type.json';
import GameModeJson from './json/game-mode.json'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DotaService {
  opendotaApiUrl = 'https://api.opendota.com/api';
  backendURL = environment.backendURL;

  //light-blue: imported, white: declared name, light-green: data type
  public lobbyT: any[] = LobbyTypeJson as LobbyType[];
  public gameM: any[] = GameModeJson as GameMode[];

  fkingList: DotaItem[] = [];

  public dotaHeroList: DotaHero[] = [];
  public dotaItemList: DotaItem[] = [];

  sub = new Subscription;

  constructor(private http: HttpClient) { }

  getHerolist() {
    this.http.get<DotaHero[]>(`${this.backendURL}/heroes`).subscribe(res => {
      this.dotaHeroList = res;
    });
  }

  getItemList() {
    this.http.get<DotaItem[]>(`${this.backendURL}/items`).subscribe(res => {
      this.dotaItemList = res;
    })
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
}
