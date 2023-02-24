import {Component, EventEmitter, Output} from '@angular/core';
import {ActionEvent, ProductActionType} from "../../state/product.state";
import {EventDriverService} from "../../state/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {

 // @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) {
  }
  onGetAllProducts() {
    this.eventDriverService.publishEvent({
        type: ProductActionType.GET_ALL_PRODUCTS
      });
    /*this.productEventEmitter.emit({
      type: ProductActionType.GET_ALL_PRODUCTS
    });*/
  }

  onGetSlectedProducts() {
    this.eventDriverService.publishEvent({
        type: ProductActionType.GET_SELECTED_PRODUCTS
      });
    /*this.productEventEmitter.emit({
      type: ProductActionType.GET_SELECTED_PRODUCTS
    });*/
  }

  onGetAvaibleProducts() {

    this.eventDriverService.publishEvent({
        type: ProductActionType.GET_AVAILABLE_PRODUCTS
      });
   /* this.productEventEmitter.emit({
      type: ProductActionType.GET_AVAILABLE_PRODUCTS
    });*/
  }

  onNewProduct() {
    this.eventDriverService.publishEvent({
        type: ProductActionType.NEW_PRODUCT
      });
    /*this.productEventEmitter.emit({
      type: ProductActionType.NEW_PRODUCT
    });*/
  }

  onSeacrch(dataForm: any) {
    this.eventDriverService.publishEvent({
        type: ProductActionType.SEARCH_PRODUCTS,
        payload: dataForm
      });
   /* this.productEventEmitter.emit({
      type: ProductActionType.SEARCH_PRODUCTS,
      payload: dataForm
    });*/
  }
}
