import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-opportunity-general',
  templateUrl: './opportunity-general.component.html',
})
export class OpportunityGeneralComponent implements OnInit, OnChanges {

  @Input()
  opportunity: any;
  constructor() { }

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

  ngOnInit() {
    if (this.opportunity) {
      this.filterByProperty();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.filterByProperty();
    }
  }

  convertToString(arr: any[]) {
    return arr.map((i) => i.name).join(', ');
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
