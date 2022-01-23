import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem, IBasket } from '../../models/basket';
import { OrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() decrement: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output() increment: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output() remove: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Input() isReadOnly: boolean = false;
  @Input() items: Array<any> = [];
  @Input() stylishTableHeader: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  decrementItemQuantity(item: BasketItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: BasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: BasketItem) {
    this.remove.emit(item);
  }
}
