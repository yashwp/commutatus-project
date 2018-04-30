import {Component, OnInit} from '@angular/core';
import {CommonService} from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  title = 'Commutatus Project';
  opportunity: any;
  backgrounds: any = {
    preferred: [],
    required: []
  };
  skills: any = {
    preferred: [],
    required: []
  };
  languages: any = {
    preferred: [],
    required: []
  };
  nationalities: any = {
    preferred: [],
    required: []
  };
  isEnabled = false;
  showModal = true;
  constructor(private _commonService: CommonService) {
  }

  ngOnInit() {
    this._commonService.getOportutnityById(526).subscribe((res: any) => {
      if (res) {
        this.opportunity = res;
        this.title = res.title;
        this.filterByProperty();
      }
    });
  }

  filterByProperty() {
    const isPreferred = ({ option }: any) => option === 'preferred';
    const isRequired = ({ option }: any) => option === 'required';
    const propertyKeys: Array<any> = ['skills', 'backgrounds', 'languages', 'nationalities'];

    for (const key of propertyKeys) {
      this[key].preferred = this.opportunity[key].filter(isPreferred);
      this[key].required = this.opportunity[key].filter(isRequired);
    }
  }

}
