import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CommonService {

  private accessToken = 'access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
  private apiPath = 'https://api-staging.aiesec.org/v2';

  constructor(private http: HttpClient) { }

  // Service using GET method to fetching opportunity data
  getOpportunityById(id: number) {
    return this.http.get(this.apiPath + `/opportunities/${id}?${this.accessToken}`);
  }

  // Service using GET method to fetching all the skills
  getSkills() {
    return this.http.get(this.apiPath + `/lists/skills/?${this.accessToken}`);
  }

  // Service using GET method to fetching all the backgrounds
  getBackgrounds() {
    return this.http.get(this.apiPath + `/lists/backgrounds/?${this.accessToken}`);
  }

  // Service using PATCH method to update opportunity
  updateOpportunity(id: number, obj: any) {
    return this.http.patch(this.apiPath + `/opportunities/${id}?${this.accessToken}`, {opportunity: obj});
  }
}
