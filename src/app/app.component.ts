import { Component } from '@angular/core';
import { VenteFormComponent } from './vente-form/vente-form.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  flagSales:boolean=false;
  flagOrders:boolean=false;
  flagShipping:boolean=false;
  constructor() {}

  ngOnInit() {this.flagSales=true;}

  getSales(){
    this.flagSales=true;
    this.flagOrders=false;
    this.flagShipping=false;


  }
  getOrders(){
    this.flagSales=false;
    this.flagOrders=true;
    this.flagShipping=false;
  }
  getShipping(){
    this.flagSales=false;
    this.flagOrders=false;
    this.flagShipping=true;
  }


}
