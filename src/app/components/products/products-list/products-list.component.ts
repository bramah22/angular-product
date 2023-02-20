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

  @Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;


  constructor() {
  }

  onSelect(p: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionType.SELECT_PRODUCT,
      payload: p
    });
  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionType.DELETE_PRODUCT,
      payload: p
    });
  }

  onEdit(p: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionType.EDIT_PRODUCT,
      payload: p
    });
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
}
