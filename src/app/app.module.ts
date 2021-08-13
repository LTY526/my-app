import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page/main-page.component';
import { DumPageComponent } from './dum-page/dum-page.component';

import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RecentMatchesComponent } from './recent-matches/recent-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    DumPageComponent,
    MainPageComponent,
    TopBarComponent,
    RecentMatchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
