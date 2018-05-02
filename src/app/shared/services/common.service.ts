import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CommonService {

  private accessToken = 'access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
  private apiPath = 'https://aiesec-task.herokuapp.com/http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2';

  constructor(private http: HttpClient) { }

  getOportutnityById(id: number) {
    return this.http.get(this.apiPath + `/opportunities/${id}?${this.accessToken}`);
  }

  getSkills() {
    return this.http.get(this.apiPath + `/lists/skills/?${this.accessToken}`);
  }

  getBackgrounds() {
    return this.http.get(this.apiPath + `/lists/backgrounds/?${this.accessToken}`);
  }

  updateOpportunity(id: number, obj: any) {
    return this.http.patch(this.apiPath + `/opportunities/${id}?${this.accessToken}`, {opportunity: obj});
  }
}
