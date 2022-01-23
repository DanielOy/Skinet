import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { BasketTotals } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({});
  basketTotals$?:Observable<BasketTotals>

  constructor(private fb: FormBuilder,
     private accountService:AccountService,
      private basketService:BasketService) { }

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotal$; 
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['', Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: ['', Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe(address=>{
      if(address){
          this.checkoutForm.get('addressForm')?.patchValue(address)
      }
    }, error=>{
      console.log(error);
    });
  }

  getDeliveryMethodValue(){
    const basket = this.basketService.getCurrentBasketValue();
    if(basket.deliveryMethodId !==null){
      this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.patchValue(basket.deliveryMethodId?.toString())
    }
  }

}
