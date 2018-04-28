import { Component } from '@angular/core';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Commutatus Project';
  constructor(private authService: AuthService) {
    this.authService.getOportutnity().subscribe((res) => console.log(res, 'auth'));
  }
}
