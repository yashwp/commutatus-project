import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {CommonService} from './shared/services/common.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'Commutatus Project';
  opportunity: any;
  isEnabled = false;
  showModal = false;
  isAlertShown = false;
  alertObj = {
    msg: '',
    isSuccess: false,
    opportunity: {}
  };
  private subscriptions: { [name: string]: ISubscription } = {};

  constructor(private _commonService: CommonService,
              private _cdr: ChangeDetectorRef) {
  }

  markForCheck() {
    setTimeout(() => {
      if (!this._cdr['destroyed']) {
        this._cdr.markForCheck();
        this._cdr.detectChanges();
      }
    });
  }

  ngOnInit() {
    this.subscriptions.opportunity = this._commonService.getOportutnityById(6124).subscribe((res: any) => {
      if (res) {
        this.opportunity = res;
        this.title = res.title;
        this.markForCheck();
      }
    });
    this.markForCheck();
  }

  showAlert(e: any) {
    this.isAlertShown = true;
    this.opportunity = e.opportunity;
    this.alertObj.isSuccess = e.isSuccess;
    this.alertObj.msg = e.isSuccess ? e.msg : e.msg.error;
    setTimeout(() => {
      this.isAlertShown = false;
      this.markForCheck();
    }, 3000);
    this.markForCheck();
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
