import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public user_url = "http://localhost:5055/api/Users/";
  public product_url = "http://localhost:5055/products/";
  public all_user = "http://localhost:5055/user";

  constructor(private apiService:ApiService) { }

  userDashboardData(){
    return this.apiService.get(this.user_url);
  }
  productDashboardData(){
    return this.apiService.get(this.product_url);
  }
  allUser():Observable<any>{
    return this.apiService.get(this.user_url+"GetAllUsers")
  }
  addUser(user_dto:any){
    return this.apiService.post(this.user_url+"AddUser", user_dto);
  }
  //get data of individual user
  singleUser(user_id:any){
    return this.apiService.get(this.user_url+user_id)
  }
  //update data of individual user
  editUser(user_id:any, user_dto:any):Observable<any>{
    return this.apiService.put(this.user_url+"UpdateUser/"+user_id, user_dto);
  }
  //delete user
  deleteUser(user_id:any){
    return this.apiService.delete(this.user_url+"DeleteUser/"+user_id)
  }
}
