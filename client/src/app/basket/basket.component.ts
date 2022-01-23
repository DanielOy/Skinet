import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem, BasketTotals, IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$?: Observable<IBasket>;
  basketTotals$?:Observable<BasketTotals>;

  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  removeBasketItem(item:BasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item:BasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item:BasketItem){
    this.basketService.decrementItemQuantity(item);
  }

}
