import { Component } from '@angular/core';
import { VenteFormComponent } from './vente-form/vente-form.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  flagSales:boolean=false;
  flagCustomer:boolean=false;
  constructor() {}

  ngOnInit() {this.flagSales=true;}

  getSales(){
    this.flagSales=true;
    this.flagCustomer=false;
  }
  getCustomer(){
    this.flagSales=false;
    this.flagCustomer=true;
  }



}
