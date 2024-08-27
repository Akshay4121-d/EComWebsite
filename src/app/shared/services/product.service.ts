import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product_url=" http://localhost:5055/api/product/"

  constructor(private httpClient:HttpClient, private apiService:ApiService) { }
  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }
  addNewProduct(product_dto:any):Observable<any>{
    return this.apiService.post(this.product_url+"AddProduct", product_dto);
  }
  singleProduct(id:any){
    return this.apiService.get(this.product_url+"getProductById?id="+id);
  }

  updateProduct(id: any, productDto: any): Observable<any> {
    const url = `${this.product_url}UpdateProduct/${id}`;
    return this.apiService.put(url, productDto);
  }

  deleteProduct(id:any):Observable<any>{
    return this.apiService.delete(this.product_url+"?id="+id);
  }
}
