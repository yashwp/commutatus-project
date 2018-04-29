import {animate, style, transition, trigger} from '@angular/animations';

export const fadeDown: any = trigger('fadeDown', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(4px)'}),
    animate('0.2s ease-in', style({opacity: 0.7, transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({opacity: 1, transform: 'translateY(0)'}),
    animate('0.2s ease-out', style({opacity: 0, transform: 'translateY(-4px)'}))
  ])
]);
