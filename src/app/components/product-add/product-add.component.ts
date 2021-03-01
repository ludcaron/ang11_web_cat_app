import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProducActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, 
              private productService: ProductsService, 
              private router:Router,
              private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required]
    });
  }

  onSaveProduct() {
    this.submitted = true;
    if(this.productFormGroup?.invalid) return;
    this.productService.save(this.productFormGroup?.value).subscribe(data=>{
      this.eventDriverService.publishEvent({type: ProducActionsTypes.PRODUCT_ADDED});
      alert('Opération faite avec succés!');
      this.router.navigateByUrl('/products');
    });
  }

}
