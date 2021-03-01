import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, AppDataState, ProducActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product | null = null;
  //@Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  
  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    //this.eventEmitter.emit({type: ProducActionsTypes.SELECT_PRODUCT, payload: product});
    this.eventDriverService.publishEvent({type: ProducActionsTypes.SELECT_PRODUCT, payload: product});
  }

  onEdit(product: Product) {
   //this.eventEmitter.emit({type: ProducActionsTypes.EDIT_PRODUCT, payload: product});
   this.eventDriverService.publishEvent({type: ProducActionsTypes.EDIT_PRODUCT, payload: product});
  }

  onDelete(product: Product) {
    //this.eventEmitter.emit({type: ProducActionsTypes.DELETE_PRODUCT, payload: product});
    this.eventDriverService.publishEvent({type: ProducActionsTypes.DELETE_PRODUCT, payload: product});
  }
}
