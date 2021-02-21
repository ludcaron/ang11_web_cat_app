import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // 2ème méthode
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;


  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
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
