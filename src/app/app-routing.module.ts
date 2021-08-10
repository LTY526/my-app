import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { DumPageComponent } from './dum-page/dum-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'dum', component: DumPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
