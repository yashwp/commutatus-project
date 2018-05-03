import {Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {CommonService} from './shared/services/common.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, OnDestroy {

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
  // fetching opportunity of id 6124
    this.subscriptions.opportunity = this._commonService.getOpportunityById(6124).subscribe((res: any) => {
      if (res) {
        // On success response filling data
        this.opportunity = res;
        this.markForCheck();
      }
    });
    this.markForCheck();
  }

  // Popping up alert on Patch request success or failure
  showAlert(e: any) {
    this.isAlertShown = true;
    this.alertObj.isSuccess = e.isSuccess;
    this.alertObj.msg = e.isSuccess ? e.msg : e.msg.error;
    if (e.isSuccess) {
      this.opportunity = e.opportunity;
    }
    setTimeout(() => {
      this.isAlertShown = false;
      this.markForCheck();
    }, 3500);
    this.markForCheck();
  }

  // Unsubscribe all the subscriptions
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
