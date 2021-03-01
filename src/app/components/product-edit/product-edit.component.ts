import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProducActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number;
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, 
              private productService: ProductsService, 
              private fb: FormBuilder,
              private router: Router,
              private eventDriverService: EventDriverService) {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product=>{
      this.productFormGroup = this.fb.group({
        id:[product.id, Validators.required],
        name:[product.name, Validators.required],
        price:[product.price, Validators.required],
        quantity:[product.quantity, Validators.required],
        selected:[product.selected, Validators.required],
        available:[product.available, Validators.required]
      })
    });
  }

  onUpdateProduct(){
    this.productService.updateProduct(this.productFormGroup?.value).subscribe(data=>{
      this.eventDriverService.publishEvent({type: ProducActionsTypes.PRODUCT_UPDATED});
      alert("Mis à jour éffectuée!");
      this.router.navigateByUrl('/products');
    });
  }

}
