import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/product.state";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService: ProductsService,
              private router: Router) {  }

  ngOnInit(): void {
  }

  onGetAllProducts() {
      this.products$ = this.productService.products().pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({dataState: DataStateEnum.LOADING}),
        catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
      );
  }

  onGetSlectedProducts() {
    this.products$ = this.productService.selectedProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onGetAvaibleProducts() {
    this.products$ = this.productService.availableProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onSeacrch(dataForm: any) {
    this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onSelect(p: Product) {
    this.productService.select(p).subscribe(
      (data) => {
        p.selected = data.selected;
      })
  }

  onDelete(p: Product) {
    if (confirm('Êtes-vous sûr ?? ')) {
      this.productService.delete(p).subscribe(
        data => this.onGetAllProducts()
      )
    }

  }

  OnNewProduct() {
    this.router.navigateByUrl("/new-product");
  }

  OnEdit(p: Product) {
    this.router.navigateByUrl("/edit/" + p.id);
  }
}
