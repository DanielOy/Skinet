import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: Product[] = [];

  constructor(private basketService:BasketService) { }

  ngOnInit() {
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log("Initalize the basket");
      },error=>{
        console.log(error);
      });
    }
  }

}
