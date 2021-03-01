import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, AppDataState, DataStateEnum, ProducActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  //@Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum = DataStateEnum;
  
  constructor() { }

  ngOnInit(): void {
  }
/*
  onSelect(p: any) {
    //this.productEventEmitter.emit({type: ProducActionsTypes.SELECT_PRODUCT, payload: p});
    this.eventDriverService.publishEvent({type: ProducActionsTypes.SELECT_PRODUCT, payload: p});
  }

  onEdit(p: any) {
    //this.productEventEmitter.emit({type: ProducActionsTypes.EDIT_PRODUCT, payload: p});
    this.eventDriverService.publishEvent({type: ProducActionsTypes.EDIT_PRODUCT, payload: p});
  }

  onDelete(p: any) {
    //this.productEventEmitter.emit({type: ProducActionsTypes.DELETE_PRODUCT, payload: p});
    this.eventDriverService.publishEvent({type: ProducActionsTypes.DELETE_PRODUCT, payload: p});
  }

  onActionEvent($event: ActionEvent) {
    this.productEventEmitter.emit($event);
  }
*/
}
