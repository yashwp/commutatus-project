import { Component, OnInit, Input } from '@angular/core';
import {slideIn} from '../shared/animations/slide';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [slideIn]
})
export class AlertComponent implements OnInit {

  @Input()
  message = '';

  @Input()
  isSuccess = false;
  @Input()
  isVisible = false;

  constructor() { }

  ngOnInit() {
  }

}
