import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroSearchService {

  private searchTextSource = new BehaviorSubject('');
  currentSearchText =  this.searchTextSource.asObservable();

  constructor() { }

  changeSearchText(query: string) {
    this.searchTextSource.next(query);
  }
}
