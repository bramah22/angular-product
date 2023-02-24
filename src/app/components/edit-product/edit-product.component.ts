import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../state/event.driver.service";
import {ProductActionType} from "../state/product.state";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  productId: number;
  productFormGroup?: FormGroup;
  submitted = false;
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductsService,
              private eventDriverService: EventDriverService,
              private fb: FormBuilder) {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
      this.productService.get(this.productId).subscribe(
        (product) => {
          this.productFormGroup = this.fb.group({
            id: [this.productId],
            name: [product.name, Validators.required],
            price: [product.price, Validators.required],
            quantity: [product.quantity, Validators.required],
            selected: [product.selected, Validators.required],
            available: [product.available, Validators.required]
          })
        }
      )
  }

  update() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) return;
    this.productService.update(this.productFormGroup?.value).subscribe(
      data => {
        this.eventDriverService.publishEvent({type: ProductActionType.PRODUCT_UPDATED});
        alert('Success: Product updated ....')
      }
    )
  }
}
