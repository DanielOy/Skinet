import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm:FormGroup = new FormGroup({});
  
  constructor(private accountService:AccountService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm')?.value).subscribe(()=>{
      this.toast.success('Address saved');
    },error=>{
      this.toast.error(error);
      console.log(error);
    })
  }
}
