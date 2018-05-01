import {animate, style, transition, trigger} from '@angular/animations';

export const slideIn: any = trigger('slideIn', [
  transition(':enter', [
    style({transform: 'translateY(-80px)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(2px)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(2px)'}),
    animate('0.3s cubic-bezier(1,0,0,1)', style({transform: 'translateY(-80px)'}))
  ])
]);
