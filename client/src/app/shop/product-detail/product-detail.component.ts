import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(private shopService: ShopService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activateRoute.snapshot.paramMap.get('id')
    if (id) {
      this.shopService.getProduct(+id).subscribe(product => {
        this.product = product;
      }, error => {
        console.log(error);
      });
    }
  }
}
