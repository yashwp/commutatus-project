import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// Libraries Modules
import {TabsModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';

// Custom
import {AppComponent} from './app.component';
import {CommonService} from './shared/services/common.service';
import {ProfileComponent} from './profile/profile.component';
import {GeneralInfoComponent} from './general-info/general-info.component';
import {DirectivesModule} from './shared/directives/directives.module';
import {EditModalComponent} from './edit-modal/edit-modal.component';
import {PipeModule} from './shared/pipe/pipe.module';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    GeneralInfoComponent,
    EditModalComponent
  ],
  imports: [
    DirectivesModule,
    PipeModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
