import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  isCollapsed=false;
  isDisabled=false;
  customer_group:any;
  order_status:any;
  payment_method:any;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.getCustomerGroup().subscribe(data => { this.customer_group = data;})
     this.getOrderStatus().subscribe(data => { this.order_status = data;})
     this.getPaymentMethod().subscribe(data => { this.payment_method = data;})
  }

  getCustomerGroup(){
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getCustomerGroup');
  }
  getOrderStatus(){
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getOrderStatus');
  }
  getPaymentMethod(){
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getPaymentMethod');
  }
}
