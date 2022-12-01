import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product!: Product;

  constructor(private db: AngularFireDatabase) { }

  create(product: Product){
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list<Product>('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return {data, key};
      })
    }));
  }

  get(productId: string) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId: string, product: Product){
    return this.db.object<Product>('/products/' + productId).update(product);
  }
}
