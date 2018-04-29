import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { TabsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import {CommonService} from './shared/services/common.service';
import { ProfileComponent } from './profile/profile.component';
import { GeneralInfoComponent } from './general-info/general-info.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    GeneralInfoComponent
  ],
  imports: [
    HttpClientModule,
    TabsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
