import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input() appStepper?:CdkStepper;
  
  constructor(private basketService: BasketService, private toast: ToastrService) {
    this.basket$ = basketService.basket$;
  }

  ngOnInit(): void {
  }

  createPaymentIntent() {
    return this.basketService.cretePaymentIntent().subscribe((response: any) => {
      this.appStepper?.next();
    }, error => {
      console.log(error);
    })
  }

}
