import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';  
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';  
import { DotaService } from './services/dota.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened: boolean = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private titleSvc: Title, 
    private dotaSvc: DotaService,
    private toastr: ToastrService,
  ) {}

  receiveSideNavSignal() {
    this.opened = !this.opened;
  }

  ngOnInit() {
    this.dotaSvc.getHerolist();
    this.dotaSvc.getItemList();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), )
      .subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data: { title: string; }) => {
          this.titleSvc.setTitle(data.title);
        })
      });
  }

  getChild(activatedRoute: ActivatedRoute): any {  
    if (activatedRoute.firstChild) {  
      return this.getChild(activatedRoute.firstChild);  
    } else {  
      return activatedRoute;  
    }  
  
  } 

  goTo(path: string) {
    this.opened = !this.opened;
    this.router.navigate([path]);
  }

  clearLocalStorage() {
    localStorage.clear();
    this.toastr.success("Done noob");
  }

  newFeature() {
    this.toastr.info(localStorage.getItem("list")!);
  }
}
