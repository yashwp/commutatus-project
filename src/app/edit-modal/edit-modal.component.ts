import {Component, OnInit, Input, Output, ViewChild, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {CommonService} from '../shared/services/common.service';
import * as moment from 'moment';
import {fadeDown} from '../shared/animations/fade';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  animations: [fadeDown]
})
export class EditModalComponent implements OnInit, OnChanges {

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  @Input()
  data: any;
  @Input()
  isModalShown = true;
  @Output()
  onClose: EventEmitter<any> = new EventEmitter<any>();

  today =  moment().format('L');
  fromDate = moment().format('DD/MM/YY');
  toDate = moment().format('DD/MM/YY');
  allBackgrounds = [];
  allSkills = [];
  minDate: any;
  maxDate: any;
  updateObj: any = {};

  constructor(private _commonService: CommonService) { }

  ngOnInit() {
    this._commonService.getBackgrounds().subscribe((bg: any) => {
      if (bg) {
        this.allBackgrounds = bg;
      }
    });
    this._commonService.getSkills().subscribe((skills: any) => {
      if (skills) {
        this.allSkills = skills;
      }
    });
    this.initialize();
  }

  initialize() {
    this.updateObj = this.getUpdateObj();
    // this.minDate = moment(this.today).add(30, 'day');
    // this.maxDate = moment(this.today).add(90, 'day');
    if (this.data) {
      this.updateObj = {
        title: this.data.title,
        description: this.data.description,
        earliest_start_date: moment(this.data.earliest_start_date).format('DD/MM/YY'),
        latest_end_date: moment(this.data.latest_end_date).format('DD/MM/YY'),
        applications_close_date: moment(this.data.applications_close_date).format('DD/MM/YY'),
        role_info: {
          city: this.data.role_info.city,
          required_preparation: null,
          learning_points: null,
          learning_points_list: [],
          additional_instructions: null,
          selection_process: this.data.role_info.selection_process
        },
        specifics_info: {
          salary: this.data.specifics_info.salary,
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data || changes.isModalShown) {
      this.initialize();
    }
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
    if (isValid) {
      console.log(this.updateObj);
    }
  }
  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
    this.onClose.emit(true);
  }

}
