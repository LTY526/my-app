import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DotaService {

  constructor(private http: HttpClient) { }

  getAllHeroes() {
    let requestUrl = 'https://api.opendota.com/api/heroes';
    return this.http.get<any[]>(requestUrl);
  }
}
