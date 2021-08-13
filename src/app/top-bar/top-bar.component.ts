import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeroSearchService } from '../shared/hero-search.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Output() event: EventEmitter<any> = new EventEmitter();

  opened: boolean = false;
  
  searchText: any;
  title: string = '';

  constructor(public router: Router, public heroSearchSvc: HeroSearchService, public titleSvc: Title) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        this.title = this.titleSvc.getTitle();
      }
    })
  }

  onSearchChange() {
    this.heroSearchSvc.changeSearchText(this.searchText);
  }

  sendSideNavSignal() {
    this.event.emit();
  }
  
}