import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product";
import {ActionEvent, ProductActionType} from "../../../state/product.state";
import {EventDriverService} from "../../../state/event.driver.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product?: Product;
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor(private eventDriverService: EventDriverService) {
  }

  onSelect(p: Product) {

    this.eventDriverService.publishEvent({
      type: ProductActionType.SELECT_PRODUCT,
      payload: p
    });
  }

  onDelete(p: Product) {
    this.eventDriverService.publishEvent({
      type: ProductActionType.DELETE_PRODUCT,
      payload: p
    });
  }

  onEdit(p: Product) {
    this.eventDriverService.publishEvent({
      type: ProductActionType.EDIT_PRODUCT,
      payload: p
    });
  }
}
