import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals, IBasket } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>({ id: '', items: [] });
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals>({ shipping: 0, subtotal: 0, total: 0 });
  basketTotal$ = this.basketTotalSource.asObservable();
  private readonly storageId = "basket_id";

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket)
      .subscribe((response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      }, error => {
        console.log(error);
      });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();
    if (basket.id == '') basket = this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id == item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id == item.id);
    if (basket.items[foundItemIndex].quantity > 1)
      basket.items[foundItemIndex].quantity--;
    else
      this.removeItemFromBasket(item);
    this.setBasket(basket);
  }

  removeItemFromBasket(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id == item.id)) {
      basket.items = basket.items.filter(x => x.id !== item.id);
      if (basket.items.length > 0)
        this.setBasket(basket);
      else
        this.deleteBasket(basket);
    }
  }

  deleteBasket(basket: IBasket) {
    this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next({ id: '', items: [] });
      this.basketTotalSource.next({ shipping: 0, subtotal: 0, total: 0 });
      localStorage.removeItem(this.storageId);
    },error=>{
      console.log(error);
    })
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((accumulated, product) => product.price * product.quantity + accumulated, 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({ shipping, subtotal, total });
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const index = items.findIndex(x => x.id == itemToAdd.id);
    if (index == -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket() {
    const basket = new Basket();
    localStorage.setItem(this.storageId, basket.id);
    return basket;
  }

  mapProductItemToBasketItem(item: Product, quantity: number): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
}
