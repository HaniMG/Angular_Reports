import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Option } from '../Option';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Vente } from '../vente';
import { Headers, Http } from '@angular/http';
import { ChartModule, UIChart } from 'primeng/chart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { GMapModule, GMap } from 'primeng/gmap';
import { AccordionModule } from 'primeng/accordion';
import { } from '@types/googlemaps';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectItem } from 'primeng/components/common/api';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Table, TableModule } from 'primeng/table';
declare var jsPDF: any;
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-vente-form',
  templateUrl: './vente-form.component.html',
  styleUrls: ['./vente-form.component.css']
})
export class VenteFormComponent implements OnInit {


  Labels: Option[];
  LesLab: string[];
  attributes: any;
  options: any;
  payment_method: any;
  shipment_method: any;
  modeoption = false;
  customer_group: any;
  model = new Vente(0, "gteq", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", 0, "gteq");
  linedata: any;
  piedata: any;
  bardata: any;
  radardata: any;
  polardata: any;
  Doughnutdata: any;
  flagCharts: boolean = false;
  ville: string[] = [];
  latitude: string[] = [];
  longitude: string[] = [];
  gmap: any;
  overlays: any[];
  isCollapsed = false;
  isDisabled = false;
  flagline = false;
  flagbar = true;
  flagpie = false;
  flagmap = false;
  flagAge_Gender = false;
  flagSpinner = false;
  flagFornewSearch = false;
  ListOfSales: any;
  activeColumns: SelectItem[];
  selectedColumns: string[] = ['Purchase_Point', 'Purchase_Date', 'Bill_to_Name', 'ship_to_Name', 'Grand_Total'];
  ListOfColumns = {
    Purchase_Point: true,
    Purchase_Date: true,
    Bill_to_Name: true,
    ship_to_Name: true,
    ship_address: false,
    List_of_Products: false,
    Grand_Total: true
  }
  array_region_color: string[] = ['#FF0000', '#7B68EE', '#006400', '#BC8F8F', '#696969'];

  items: MenuItem[];
  @ViewChild('bar') barcontent: ElementRef
  @ViewChild('line') linecontent: ElementRef
  @ViewChild('pie') piecontent: ElementRef
  @ViewChild('map') mapcontent: ElementRef

  @ViewChild('barchart') barchart: UIChart
  @ViewChild('linechart') linechart: UIChart
  @ViewChild('piechart') piechart: UIChart

  @ViewChild('records') records:HTMLTableElement

  months_nb: number[] = [];
  months_names: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  months_charts: string[] = [];
  years: number[] = [];
  region_list: string[] = [];
  nb_salesByRegion: number[] = [];
  flagSalesByDay: boolean;
  nb_random: number;
  test:any[]=[];
  /**
   * Creates an instance of VenteFormComponent.
   * @param {HttpClient} http
   * @param {Http} _http
   * @memberof VenteFormComponent
   */
  constructor(private http: HttpClient, private _http: Http) { }

  /**
   * life cycle hook called by Angular to indicate that Angular is done creating the component.
   *
   * @memberof VenteFormComponent
   */
  ngOnInit() {

    this.readCsvData("ville");
    this.readCsvData("latitude");
    this.readCsvData("longitude");
    this.getAttributes().subscribe(data => { this.attributes = data; });
    this.getCustomerGroup().subscribe(data => { this.customer_group = data; });
    this.getPaymentMethod().subscribe(data => { this.payment_method = data; });
    this.getShippingMethod().subscribe(data => { this.shipment_method = data; });
    this.activeColumns = [
      { label: 'Purchase Point', value: 'Purchase_Point' },
      { label: 'Purchase Date', value: 'Purchase_Date' },
      { label: 'Billed to', value: 'Bill_to_Name' },
      { label: 'Shiped to', value: 'ship_to_Name' },
      { label: 'ship address', value: 'ship_address' },
      { label: 'List-of Products', value: 'List_of_Products' },
      { label: 'Grand Total', value: 'Grand_Total' },
    ];
    this.items = [
      { label: 'Bar', icon: 'fa-bar-chart', url: '#bar', command: (onclick) => { this.flagline = false; this.flagbar = true; this.flagpie = false; this.flagmap = false; } },
      { label: 'Line', icon: 'fas fa-chart-line', command: (onclick) => { this.flagline = true; this.flagbar = false; this.flagpie = false; this.flagmap = false; } },
      { label: 'Pie', icon: 'fas fa-chart-pie', command: (onclick) => { this.flagline = false; this.flagbar = false; this.flagpie = true; this.flagmap = false; } },
      { label: 'Map', icon: 'fas fa-map-marker', command: (onclick) => { this.flagline = false; this.flagbar = false; this.flagpie = false; this.flagmap = true; } }

    ];


  }
  /**
   * List of product attribute
   *@returns json
   * @memberof VenteFormComponent
   */
  getAttributes() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getProductAttribute');
  }
  /**
   *
   *List of attribute options
   * @param {string} attribute
   * @returns json
   * @memberof VenteFormComponent
   */
  getOptions(attribute: string) {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getAttributeValue/' + attribute);
  }
  /**
   * list of all customer groups
   *
   * @returns json
   * @memberof VenteFormComponent
   */
  getCustomerGroup() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getCustomerGroup');
  }
  /**
   *
   *list of all payment method
   * @returns json
   * @memberof VenteFormComponent
   */
  getPaymentMethod() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getPaymentMethod');
  }
  /**
   * list of all shipment methods
   *
   * @returns json
   * @memberof VenteFormComponent
   */
  getShippingMethod() {
    return this.http.get('http://ultravision/rest/all/V1/statistique/getShippingMethod');
  }
  /**
   * list of sales by model
   *
   * @returns
   * @memberof VenteFormComponent
   */
  getSales() {
    let lien: string;
    let date_from = 'none';
    let date_to = 'none';
    if (this.model.From != 'none' && this.model.To != 'none') {
      date_from = this.model.From['year'] + '-' + this.model.From['month'] + '-' + this.model.From['day'];
      date_to = this.model.To['year'] + '-' + this.model.To['month'] + '-' + this.model.To['day'];
    }
    lien = 'http://ultravision/rest/all/V1/statistique/getSalesByCriterion/' + this.model.amount + '/' + this.model.operator1 + '/' + this.model.product_attribute + '/' + this.model.attribute_option + '/' + this.model.customer_group + '/' + this.model.customer_age + '/' + this.model.customer_gender + '/' + this.model.region + '/' + date_from + '/' + date_to + '/' + this.model.payment_method + '/' + this.model.shipments_method + '/' + this.model.shipments_weight + '/' + this.model.operator2;
    return this.http.get(lien);
  }

  /**
   * get all charts data
   *
   * @memberof VenteFormComponent
   */
  getChartsData() {
    this.flagSpinner = true;
    this.isCollapsed = true;
    this.flagCharts = false;
    this.flagFornewSearch = true;

    // get data of sales
    this.getSales().subscribe(data => {
      this.ListOfSales = data;
      for (var order of this.ListOfSales) {
        this.test.push({
          id:order['entity_id'],
          Purchase_Point:order['store_name'],
          Purchase_Date:order['created_at'],
          Bill_to_Name:order['bill_to_name'],
          ship_to_Name:order['ship_to_name'],
          ship_address:order['region'],
          List_of_Products:order['street'],
          Grand_Total:order['grand_total']
        });
      }
      this.getBarChartData()
      if (this.model.region == 'none') this.getnb_salesByRegion();
      if (this.model.From != 'none' && this.model.To != 'none' && this.model.From['year'] == this.model.To['year']) {
        if (this.model.To['month'] == this.model.From['month'] || this.model.To['month'] == this.model.From['month'] + 1) {
          this.getsalesByDay();
          this.flagSalesByDay = true;
        }
      }
      else
        this.flagSalesByDay = false;
      if (this.model.customer_group == 'none')  this.getSalesByCustomerGroup()
    });
    setTimeout(() => {
      this.flagSpinner = false;
      this.flagCharts = true;

    }, 3000);
  }

  /**
   * list of region from CSV file
   *
   * @memberof VenteFormComponent
   */
  readCsvData(target) {
    this._http.get("/assets/" + target + ".csv")
      .subscribe(
        data => this.extractData(data, target)
      );
  }

  private extractData(res, target) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for (let i = 0; i < allTextLines.length; i++) {
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        if (target == "ville")
          this.ville.push(tarr.toString());
        if (target == "latitude")
          this.latitude.push(tarr.toString());
        if (target == "longitude")
          this.longitude.push(tarr.toString());
      }
    }



  }
  /**
   * Generate a PDF file
   *
   * @memberof VenteFormComponent
   */
  exportPDF() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    let content;

    if (this.flagbar) {
      content = this.barcontent.nativeElement;
      let image = this.barchart.getBase64Image();
      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 200,
        'elementHandlers': specialElementHandlers
      });
      doc.addImage(image, 'JPEG', 15, 40, 190, 80);
    }
    if (this.flagline) {
      content = this.linecontent.nativeElement;
      let image = this.linechart.getBase64Image();
      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 200,
        'elementHandlers': specialElementHandlers
      });
      doc.addImage(image, 'JPEG', 15, 40, 190, 80);
    }
    if (this.flagpie) {
      content = this.piecontent.nativeElement;
      let pieimage = this.piechart.getBase64Image();
      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 200,
        'elementHandlers': specialElementHandlers
      });
      doc.addImage(pieimage, 'JPEG', 15, 40, 190, 80);
    }
    var table = doc.autoTableHtmlToJson(document.getElementById("table"));
    doc.autoTable(table.columns, table.data, {startY: 130});
    doc.save('test.pdf');
  }


  getBarChartData() {

    for (var order of this.ListOfSales) {
      let date = new Date(order['created_at']);
      let nb_month = date.getMonth();
      let year = date.getFullYear();
      if (this.months_nb.indexOf(nb_month) < 0)
        this.months_nb.push(nb_month);
      if (this.years.indexOf(year) < 0)
        this.years.push(year);
    }
    this.months_nb = this.months_nb.sort();
    for (let index = 0; index < this.months_nb.length; index++) {
      let nb = this.months_nb[index];
      this.months_charts[index] = this.months_names[nb];

    }
    let datasets: any[] = [];
    for (let index = 0; index < this.years.length; index++) {
      datasets.push(
        {
          label: this.years[index],
          backgroundColor: this.array_region_color[this.randomInt(0, 4)],
          borderColor: '#696969',
          data: this.getnb_salesByMonth(this.years[index]),
        }
      );

    }

    this.bardata = {
      labels: this.months_charts,
      datasets: datasets
    }
  }
  getnb_salesByMonth(year) {
    let nb_sales: number[] = [];
    for (var order of this.ListOfSales) {
      let date = new Date(order['created_at']);
      if (date.getFullYear() == year) {
        let index = this.months_nb.indexOf(date.getMonth());
        if (nb_sales[index])
          nb_sales[index]++;
        else
          nb_sales[index] = 1;
      }
    }
    return nb_sales;
  }

  getnb_salesByRegion() {
    for (var order of this.ListOfSales) {
      let region = order['region'];
      if (this.region_list.indexOf(region) < 0)
        this.region_list.push(region);
      let index = this.region_list.indexOf(region);
      if (this.nb_salesByRegion[index])
        this.nb_salesByRegion[index]++;
      else
        this.nb_salesByRegion[index] = 1;
    }
    this.gmap = {
      center: { lat: 36.3000, lng: 9.8000 },
      zoom: 8
    };
    this.overlays = [];
    for (let index = 0; index < this.region_list.length; index++) {
      let position = this.ville.indexOf(this.region_list[index]);
      let lat = Number(this.latitude[position]);
      let lng = Number(this.longitude[position]);
      let rad = this.nb_salesByRegion[index] * 1000;

      this.overlays[index] = new google.maps.Circle({ center: { lat: lat, lng: lng }, fillColor: this.array_region_color[this.randomInt(0, 4)], fillOpacity: 0.70, strokeWeight: 1, radius: rad });
    }
  }

  getsalesByDay() {

    let days: string[] = [];
    let sales_byDays: number[] = [];
    let index = 0;
    for (var order of this.ListOfSales) {
      let date = new Date(order['created_at']);
      let string_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      let position = days.indexOf(string_date);
      if (position < 0) {
        days[index] = string_date;
        sales_byDays[index] = 1;
        index++;
      }
      else
        sales_byDays[position]++;
    }

    this.linedata = {
      labels: days,
      datasets: [
        {
          label: '',
          data: sales_byDays,
          fill: false,
          borderColor: '#4bc0c0',
        }
      ]
    }
  }

  /**
   *
   *
   * @memberof VenteFormComponent
   */

  getSalesByCustomerGroup() {
    let nb_sales: number[] = [];
    let groups: string[] = [];
    let index = 0;
    for (var order of this.ListOfSales) {
      let position = groups.indexOf(order['customer_group']);
      if (position < 0) {
        groups[index] = order['customer_group'];
        nb_sales[index] = 1;
        index++;
      }
      else nb_sales[position]++;
    }
    this.piedata = {
      labels: groups,
      datasets: [
        {
          data: nb_sales,
          backgroundColor: this.array_region_color.slice(0, groups.length - 1),
          hoverBackgroundColor: this.array_region_color.slice(0, groups.length - 1),
        }
      ]
    };
  }

  /**
   *
   *
   * @memberof VenteFormComponent
   */
  onChange() {
    if (this.model.product_attribute != "none") {
      this.getOptions(this.model.product_attribute).subscribe(data => { this.options = data; });
      this.modeoption = true;
    }
    else this.modeoption = false;

  }
  /**
   *
   *
   * @memberof VenteFormComponent
   */
  onChangeRadio() {

    if (this.model.customer_group == "General") { this.flagAge_Gender = true; }
    else this.flagAge_Gender = false;
  }
  /**
   *
   * random position in the table of colors
   * @param {number} min
   * @param {number} max
   * @returns number
   * @memberof VenteFormComponent
   */
  randomInt(min, max) {
    let position = Math.floor(Math.random() * (max - min + 1)) + min;
    while (position == this.nb_random) {
      position = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.nb_random = position;
    return position;
  }
   /**
   * clear the formulaire
   *
   * @memberof VenteFormComponent
   */
  clear() {
    this.model = new Vente(0, "gteq", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", 0, "gteq");
  }
  /**
   * reload the module
   *
   * @memberof VenteFormComponent
   */
  newSearch() {
    window.location.reload();
  }
  /**
   *
   * Change a character into a string
   * @param {string} s
   * @returns string
   * @memberof VenteFormComponent
   */
  replaceLineBreak(s: string) {
    return s && s.replace('\n', '<br />&nbsp;&nbsp;&nbsp;');
  }

  /**
   * Enable/Disable the columns of table
   *
   * @memberof VenteFormComponent
   */
  changeTable() {
    if (this.selectedColumns.indexOf('Purchase_Point') >= 0) this.ListOfColumns.Purchase_Point = true; else this.ListOfColumns.Purchase_Point = false;
    if (this.selectedColumns.indexOf('Purchase_Date') >= 0) this.ListOfColumns.Purchase_Date = true; else this.ListOfColumns.Purchase_Date = false;
    if (this.selectedColumns.indexOf('Bill_to_Name') >= 0) this.ListOfColumns.Bill_to_Name = true; else this.ListOfColumns.Bill_to_Name = false;
    if (this.selectedColumns.indexOf('ship_to_Name') >= 0) this.ListOfColumns.ship_to_Name = true; else this.ListOfColumns.ship_to_Name = false;
    if (this.selectedColumns.indexOf('ship_address') >= 0) this.ListOfColumns.ship_address = true; else this.ListOfColumns.ship_address = false;
    if (this.selectedColumns.indexOf('List_of_Products') >= 0) this.ListOfColumns.List_of_Products = true; else this.ListOfColumns.List_of_Products = false;
    if (this.selectedColumns.indexOf('Grand_Total') >= 0) this.ListOfColumns.Grand_Total = true; else this.ListOfColumns.Grand_Total = false;
  }

}
