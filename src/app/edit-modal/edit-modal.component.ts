import {Component, OnInit, Input, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {CommonService} from '../shared/services/common.service';
import * as moment from 'moment';
import {fadeDown} from '../shared/animations/fade';
import {NgForm} from '@angular/forms';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {ISubscription} from "rxjs/Subscription";


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  animations: [fadeDown]
})
export class EditModalComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @Input()
  data: any;
  @Input()
  isModalShown = true;
  @Output()
  onClose: EventEmitter<any> = new EventEmitter<any>();

  options = {
    componentRestrictions: { country: 'IN' }
  };
  today =  moment().format('L');
  fromDate = moment().format('DD/MM/YY');
  toDate = moment().format('DD/MM/YY');
  allBackgrounds = [];
  allSkills = [];
  minDate: any;
  maxDate: any;
  updateObj: any = {};
  private subscriptions: { [name: string]: ISubscription } = {};

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this.subscriptions.bg = this._commonService.getBackgrounds().subscribe((bg: any) => {
      if (bg) {
        this.allBackgrounds = [...bg];
      }
    });
    this.subscriptions.skill = this._commonService.getSkills().subscribe((skills: any) => {
      if (skills) {
        this.allSkills = [...skills];
      }
    });
    this.initialize();
  }

  initialize() {
    this.updateObj = this.getUpdateObj();
    this.minDate = moment(this.today).add(30, 'day');
    this.maxDate = moment(this.today).add(90, 'day');
    if (this.data) {
      this.updateObj.title = this.data.title;
      this.updateObj.description = this.data.description;
      this.updateObj.earliest_start_date = moment(this.data.earliest_start_date).format('DD/MM/YY');
      this.updateObj.latest_end_date = moment(this.data.latest_end_date).format('DD/MM/YY');
      this.updateObj.applications_close_date = moment(this.data.applications_close_date).format('DD/MM/YY');
      this.updateObj.backgrounds = this.data.backgrounds;
      this.updateObj.skills = this.data.skills;
      this.updateObj.role_info.city = this.data.role_info.city;
      this.updateObj.role_info.selection_process = this.data.role_info.selection_process;
      this.updateObj.specifics_info.salary = this.data.specifics_info.salary;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data || changes.isModalShown) {
      this.initialize();
    }
  }

  onCityChange(address: Address) {
    this.updateObj.role_info.city = address.formatted_address;
  }

  addOptionProperty(arr: any[]) {
    return arr.map((i: any) => {
      if (!i.hasOwnProperty('option')) {
        return Object.assign({option: 'preferred'}, i);
      }
    });
  }

  getUpdateObj() {
    return {
      title: '',
      description: '',
      skills: [],
      backgrounds: [],
      earliest_start_date: '',
      latest_end_date: '',
      applications_close_date: '',
      role_info: {
        city: '',
        required_preparation: null,
        learning_points: null,
        learning_points_list: [],
        additional_instructions: null,
        selection_process: ''
      },
      specifics_info: {
        salary: 0,
        salary_currency: null,
        ask_gip_question: null,
        salary_periodicity: null,
        ef_test_required: null,
        computer: false,
        saturday_work: false,
        expected_work_schedule: null,
        saturday_work_schedule: null
      }
    };
  }

  update(isValid: boolean, form: NgForm) {
    for (const key of Object.keys(this.updateObj)) {
      if (key === 'backgrounds' || key === 'skills') {
        this.updateObj[key] = this.addOptionProperty(this.updateObj[key]);
      }
    }
    console.log(' plese chal ja', this.updateObj);
    if (isValid) {
      this.subscriptions.update = this._commonService.updateOpportunity(this.data.id, this.updateObj).subscribe((res: any) => {
        if (res) {
          console.log('after response');
        }
      });
    }
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    this.onClose.emit(true);
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
