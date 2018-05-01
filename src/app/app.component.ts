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
  isEnabled = false;
  showModal = false;
  isAlertShown = false;
  alertObj = {
    msg: '',
    isSuccess: false
  };
  private subscriptions: { [name: string]: ISubscription } = {};

  constructor(private _commonService: CommonService) {
  }

  ngOnInit() {
    this.subscriptions.opportunity = this._commonService.getOportutnityById(6124).subscribe((res: any) => {
      if (res) {
        this.opportunity = res;
        this.title = res.title;
      }
    });
  }

  showAlert(e: any) {
    this.isAlertShown = true;
    this.alertObj.isSuccess = e.isSuccess;
    this.alertObj.msg = e.isSuccess ? e.msg : e.msg.error;
    setTimeout(() => {
      this.isAlertShown = false;
    }, 3000);
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
