import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {

  @Input()
  opportunity: any;

  isEnabled = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log('change', changes);
    }
  }

  getFormatedDate(date: any) {
    return moment(date).format('Do MMM Y');
  }

}
