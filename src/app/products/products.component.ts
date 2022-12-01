import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] | any;
  productsSubscription: Subscription;
  category: string | any;
  filteredProducts: Product[] | any;
  cart: any;
  cartSubscription: Subscription | any;
  

  // https://stackoverflow.com/questions/57214944/typescript-error-ts2740-type-is-missing-the-following-properties-from-typ
  // https://stackoverflow.com/questions/61750521/how-to-filter-categories-in-angular-9/61751119#61751119
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
      this.productsSubscription = this.productService.getAll()
        .pipe(switchMap(products => {
            this.products = products;
            return route.queryParamMap;
          }
        ))
        .subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = this.category? 
            this.products.filter((p: any) => p.data.category.toLowerCase().includes(this.category.toLowerCase())):
            this.products;
        });

   }

   async ngOnInit() {
    //this.cartSubscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);  
   }

   ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
   }

}