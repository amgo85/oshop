import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/models/product';
 import { ProductService } from 'src/app/product.service';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$!: { title: string; }[] | any;
  categories!: { title: string; }[] | any;
  subscription!: Subscription;
  subscription$!: Subscription;
  product: Product = {
    category: "",
    imageUrl: "",
    price: 0,
    title: "",
  };
  
  id;
  //product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
      
      /*
      this.subscription = this.categoryService.getCategories().subscribe( categories => {
        this.categories = categories;
      }); */

      this.categories$ = this.categoryService.getAll();
      //this.categories$ = this.categoryService.getCategoriesValueChanges();

      /*this.subscription$ = this.categoryService.getCategoriesValueChanges().subscribe( categories => {
        this.categories$ = categories;
      }); */
      //this.categories$ = this.categoryService.getCategoriesValueChanges();

      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id)  this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p );

  }   // no need to add the private access modifier as we are not going to reference this anywhere outsde the constructor

save(product: Product){
  console.log(product);
  if(this.id) this.productService.update(this.id, product);
  else  this.productService.create(product);

  this.router.navigate(['/admin/products']);
}

  ngOnInit(): void {
    this.categories = this.categoryService.getAll()
                                        .pipe(tap(c => console.log("category =", c)));
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
    //this.subscription$.unsubscribe();
  }

}
