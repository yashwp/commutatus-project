import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonService} from './shared/services/common.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

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
  private subscriptions: { [name: string]: ISubscription } = {};

  constructor(private _commonService: CommonService) {
  }

  ngOnInit() {
    this.subscriptions.opportunity = this._commonService.getOportutnityById(526).subscribe((res: any) => {
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

    ngOnDestroy() {
      if (this.subscriptions) {
        for (const [key, value] of Object.entries(this.subscriptions)) {
          if (value) {
            (value as ISubscription).unsubscribe();
          }
        }
      }
    }
  }

}
