import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, ProducActionsTypes } from 'src/app/state/product.state';



@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {

  @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.productEventEmitter.emit({type: ProducActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    this.productEventEmitter.emit({type: ProducActionsTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.productEventEmitter.emit({type: ProducActionsTypes.GET_ALLVAILABLE_RODUCTS});
  }

  onNewProduct() {
    this.productEventEmitter.emit({type: ProducActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({type: ProducActionsTypes.SEARCH_PRODUCTS, payload: dataForm});
  }
}
