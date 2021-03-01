import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, ProducActionsTypes } from 'src/app/state/product.state';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // 2ème méthode
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;
  //readonly ProducActionsTypes = ProducActionsTypes;


  constructor(private productsService: ProductsService, 
              private router: Router,
              private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
  }


  // 2ème méthode suite
  onGetAllProducts() {
    console.log('start....');
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data: Product[]) => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err: any) => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data: Product[]) => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err: any) => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvallableProducts().pipe(
      map((data: Product[]) => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err: any) => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map((data: Product[]) => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data: data })
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err: any) => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe(data => {
      p.selected = data.selected;
    })
  }

  onDelete(p: Product) {
    let v = confirm("Êtes-vous sûre de vouloir supprimer?")
    if (v == true) {
      this.productsService.deleteProduct(p).subscribe(data => {
        this.onGetAllProducts();
      });
    }
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/" + p.id);
  }

  onActionEvent($event: ActionEvent) {
    console.log($event.type);
    switch ($event.type) {
      case ProducActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProducActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProducActionsTypes.GET_ALLVAILABLE_RODUCTS: this.onGetAvailableProducts(); break;
      case ProducActionsTypes.NEW_PRODUCT: this.onNewProduct(); break;
      case ProducActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProducActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload); break;
      case ProducActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload); break;
    }
  }


  //1ere méthode qui fonctionne
  /* products:Product[] | null=null;

  onGetAllProducts(){
    this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }
  
  onGetSelectedProducts(){
    this.productsService.getSelectedProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }

  onGetAvailableProducts(){
    this.productsService.getAvallableProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  } */

}
