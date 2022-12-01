import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['title', 'price', 'key' ];
  //products$: Product;
  //products!: { title: string; price: number; category: string; imageUrl: string }[] | any;
  products!: { title: string; }[] | any;
  //products!: { data: Product; key: string; }[] | any;
  //products!: Product[] | any;
  filteredProducts!: any[];
  subscription!: Subscription;
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  itemResource: MatTableDataSource<Product>;
  items: Product[] = [];
  itemCount = 0;

  constructor(private productService: ProductService) { 
    //this.products$ = this.productService.getAll();
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;

      //this.dataSource = new MatTableDataSource<Product>(products);
    });
  }

  

  //https://stackoverflow.com/questions/49131895/how-to-use-snapshotchanges-method-to-get-both-key-value-and-filter-the-data
  filter(query: string){
    console.log(query);
    this.filteredProducts = (query) ? 
      this.products.filter((p: { data: {title:string}, key: string }) => p.data.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : 
      this.products;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }

  /*ngOnInit(): void {
    this.products$ = this.productService.getAll().pipe(tap(p => console.log("product =", p)));
  }*/

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
