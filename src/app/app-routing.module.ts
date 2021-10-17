import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RecentMatchesComponent } from './recent-matches/recent-matches.component';

const routes: Routes = [
  { path: '', component: RecentMatchesComponent, data: { title: 'Dota Recent Matches' } },
  { path: 'recent', component: RecentMatchesComponent, data: { title: 'Dota Recent Matches' } },
  { path: 'herolist', component: MainPageComponent, data: { title: 'Hero List' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//{ path: '', redirectTo: '/recent', pathMatch: 'full'},
//{ path: 'dum', component: DumPageComponent, data: { title: 'Dumb Dog' } },