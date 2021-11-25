import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(private shopService: ShopService,
    private bcService: BreadcrumbService,
    private activateRoute: ActivatedRoute) { 
      bcService.set('@productDetails',' ');
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activateRoute.snapshot.paramMap.get('id')
    if (id) {
      this.shopService.getProduct(+id).subscribe(product => {
        this.product = product;
        this.bcService.set('@productDetails', product.name);
      }, error => {
        console.log(error);
      });
    }
  }
}
