import {Component, EventEmitter, Output} from '@angular/core';
import {ActionEvent, ProductActionType} from "../../state/product.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() {
  }
  onGetAllProducts() {
    this.productEventEmitter.emit({
      type: ProductActionType.GET_ALL_PRODUCTS
    });
  }

  onGetSlectedProducts() {
    this.productEventEmitter.emit({
      type: ProductActionType.GET_SELECTED_PRODUCTS
    });
  }

  onGetAvaibleProducts() {
    this.productEventEmitter.emit({
      type: ProductActionType.GET_AVAILABLE_PRODUCTS
    });
  }

  onNewProduct() {
    this.productEventEmitter.emit({
      type: ProductActionType.NEW_PRODUCT
    });
  }

  onSeacrch(dataForm: any) {
    this.productEventEmitter.emit({
      type: ProductActionType.SEARCH_PRODUCTS,
      payload: dataForm
    });
  }
}
