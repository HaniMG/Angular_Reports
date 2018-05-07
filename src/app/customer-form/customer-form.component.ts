import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customer_group: any;
  Sales:any[] = [];
  constructor(private http: HttpClient, private _http: Http) { }

  ngOnInit() {
    this.getCustomerGroup().subscribe(data => { this.customer_group = data; });
    this.getAllSales().subscribe(data => {
      for (const key in data)
        this.Sales.push(data[key]);
    })
    console.log(this.Sales);
  }
/**
 *
 *
 * @returns
 * @memberof CustomerFormComponent
 */
getCustomerGroup() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getCustomerGroup');
  }

/**
 *
 *
 * @returns
 * @memberof CustomerFormComponent
 */
getAllSales(){
  let lien: string;
  lien = 'http://ultravision/index.php/rest/V1/statistique/getAllSales';
    return this.http.get(lien);

}

replaceLineBreak(s: string) {
  return s && s.replace('\n', '<br />&nbsp;&nbsp;&nbsp;');
}

}
