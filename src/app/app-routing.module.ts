import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RecentMatchesComponent } from './recent-matches/recent-matches.component';
import { DumPageComponent } from './dum-page/dum-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/herolist', pathMatch: 'full'},
  { path: 'herolist', component: MainPageComponent, data: { title: 'Hero List' } },
  { path: 'recent', component: RecentMatchesComponent, data: { title: 'Recent Matches' } },
  { path: 'recent/:id', component: RecentMatchesComponent, data: { title: 'Recent Matches' } },
  { path: 'dum', component: DumPageComponent, data: { title: 'Dumb Dog' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
