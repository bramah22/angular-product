import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {EventDriverService} from "../state/event.driver.service";
import {ProductActionType} from "../state/product.state";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  productFormGroup?: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private eventDriverService: EventDriverService) {
  }

  ngOnInit() {
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    })
  }

  onSave() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.productService.save(this.productFormGroup?.value).subscribe(
      data => {
        this.eventDriverService.publishEvent({type: ProductActionType.PRODUCT_ADDED});
        alert('Success ....');
      }
    )
  }
}
