import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from "../../state/product.state";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;

  readonly DataStateEnum = DataStateEnum;


  constructor() {
  }

}
