import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return {data, key};
      })
    }));
  }

  getCategoriesValueChanges() {
    return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }
}
