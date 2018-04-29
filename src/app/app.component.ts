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
  constructor(private _commonService: CommonService) {
  }

  ngOnInit() {
    this._commonService.getOportutnity().subscribe((res: any) => {
      if (res) {
        this.opportunity = res;
        this.title = res.title;
        this.filterByProperty();
      }
    });
  }

  filterByProperty() {
    this.skills.preferred = this.opportunity.skills.filter((i) => i.option === 'preferred');
    this.skills.required = this.opportunity.skills.filter((i) => i.option === 'required');
    this.backgrounds.preferred = this.opportunity.backgrounds.filter((i) => i.option === 'preferred');
    this.backgrounds.required = this.opportunity.backgrounds.filter((i) => i.option === 'required');
    this.languages.preferred = this.opportunity.languages.filter((i) => i.option === 'preferred');
    this.languages.required = this.opportunity.languages.filter((i) => i.option === 'required');
    this.nationalities.preferred = this.opportunity.nationalities.filter((i) => i.option === 'preferred');
    this.nationalities.required = this.opportunity.nationalities.filter((i) => i.option === 'required');
  }
}
