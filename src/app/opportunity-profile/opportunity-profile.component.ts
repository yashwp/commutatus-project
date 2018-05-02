import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-opportunity-profile',
  templateUrl: './opportunity-profile.component.html',
})
export class OpportunityProfileComponent implements OnChanges {

  @Input()
  opportunity: any;

  isEnabled = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
    }
  }

  // Formatting the date in Do MMM Y format e.g. 3rd May 2018
  getFormatedDate(date: any) {
    return moment(date).format('Do MMM Y');
  }

  // Joining the elements of array using ', '
  convertToString(arr: any[]) {
    return arr.map((i) => i.name).join(', ');
  }

}
