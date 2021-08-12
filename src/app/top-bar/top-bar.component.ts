import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HeroSearchService } from '../shared/hero-search.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  searchText: any;

  constructor(public router: Router, public heroSearchSvc: HeroSearchService) { }

  ngOnInit(): void {
  }

  onSearchChange() {
    this.heroSearchSvc.changeSearchText(this.searchText);
  }
}
