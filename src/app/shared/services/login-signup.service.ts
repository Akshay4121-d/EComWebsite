import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public const_url = "http://localhost:5055/api/Account";

  constructor(private http: HttpClient, private apiService: ApiService) { }
  authLogin(loginObj: any): Observable<any> {
    return this.apiService.post(this.const_url + '/Login',loginObj);
  }

  userRegister(user_dto: any): Observable<any> {
    return this.apiService.post(this.const_url + '/RegisterUser', user_dto)
  }

  adminLogin(loginObj: any): Observable<any> {
    return this.apiService.post(this.const_url + '/Login',loginObj);

  }
}
