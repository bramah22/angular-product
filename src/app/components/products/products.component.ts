import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from "../state/product.state";
import {Router} from "@angular/router";
import {EventDriverService} from "../state/event.driver.service";

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
              private eventDriverService: EventDriverService,
              private router: Router) {  }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        this.onActionEvent(actionEvent);
      }
    )
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

  onNewProduct() {
    this.router.navigateByUrl("/new-product");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/edit/" + p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionType.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionType.GET_SELECTED_PRODUCTS:
        this.onGetSlectedProducts();
        break;
      case ProductActionType.GET_AVAILABLE_PRODUCTS:
        this.onGetAvaibleProducts();
        break;
      case ProductActionType.SEARCH_PRODUCTS:
        this.onSeacrch($event.payload);
        break;
      case ProductActionType.NEW_PRODUCT:
        this.onNewProduct();
        break;
      case ProductActionType.SELECT_PRODUCT:
        this.onSelect($event.payload);
        break;
      case ProductActionType.DELETE_PRODUCT:
        this.onDelete($event.payload);
        break;
      case ProductActionType.EDIT_PRODUCT:
        this.onEdit($event.payload);
        break;
    }
  }
}
