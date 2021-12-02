import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem, IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$?: Observable<IBasket>;

  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
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
