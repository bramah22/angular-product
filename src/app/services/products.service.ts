import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  products(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + '/products');
  }
  selectedProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + '/products?selected=true');
  }
  availableProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + '/products?available=true');
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl + '/products?name_like=' + keyword);
  }
  select(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.httpClient.put<Product>(this.baseUrl + '/products/' + product.id , product);
  }
  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl + '/products' , product);
  }

  delete(product: Product): Observable<void> {
    product.selected = !product.selected;
    return this.httpClient.delete<void>(this.baseUrl + '/products/' + product.id);
  }
  get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + '/products/' + id);
  }

  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.baseUrl + '/products/' + product.id, product);
  }
}
