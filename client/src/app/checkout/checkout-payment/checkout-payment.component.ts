import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IBasket } from 'src/app/shared/models/basket';
import { Order, OrderToCreate } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup = new FormGroup({});

  constructor(private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: Order) => {
      this.toast.success('Order created successfully');
      this.basketService.deleteLocalBasket();
      console.log(order);
      const navigationExtras: NavigationExtras = { state: order };
      this.router.navigate(['checkout/success'], navigationExtras)
    }, error => {
      this.toast.error(error);
      console.log(error);
    });
  }

  getOrderToCreate(basket: IBasket): OrderToCreate {
    return {
      basketId: basket.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shipToAddress: this.checkoutForm.get('addressForm')?.value
    }
  }

}
