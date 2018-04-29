import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitToDirective } from './limit-to.directive';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LimitToDirective],
  exports: [LimitToDirective]
})
export class DirectivesModule { }
