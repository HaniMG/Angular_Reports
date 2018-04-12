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

import * as jsPDF from 'jspdf';
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
  model = new Vente(0, "", "", "","","","",{From:"",To:""},"","",0);
  data: any;
  piedata: any;
  bardata: any;
  radardata: any;
  polardata: any;
  Doughnutdata: any;
  flagCharts: boolean = false;
  ville: any[] = [];
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

  items: MenuItem[];
  @ViewChild('bar') barcontent: ElementRef
  @ViewChild('line') linecontent: ElementRef
  @ViewChild('pie') piecontent: ElementRef
  @ViewChild('map') mapcontent: ElementRef

  @ViewChild('barchart') barchart: UIChart
  @ViewChild('linechart') linechart: UIChart
  @ViewChild('piechart') piechart: UIChart
  @ViewChild('radarchart') radarchart: UIChart
  @ViewChild('polarchart') polarchart: UIChart
  @ViewChild('doughnutchart') doughnutchart: UIChart
  @ViewChild('mapchart') mapchart: GMap
  constructor(private http: HttpClient, private _http: Http) { }

  ngOnInit() {

    this.readCsvData();
    this.getAttributes().subscribe(data => { this.attributes = data; });
    this.getCustomerGroup().subscribe(data => { this.customer_group = data; });
    this.getPaymentMethod().subscribe(data => { this.payment_method = data; });
    this.getShippingMethod().subscribe(data => { this.shipment_method = data; });
    this.items = [
      { label: 'Bar', icon: 'fa-bar-chart', url: '#bar', command: (onclick) => { this.flagline = false; this.flagbar = true; this.flagpie = false; this.flagmap = false; } },
      { label: 'Line', icon: 'fas fa-chart-line', command: (onclick) => { this.flagline = true; this.flagbar = false; this.flagpie = false; this.flagmap = false; } },
      { label: 'Pie', icon: 'fas fa-chart-pie', command: (onclick) => { this.flagline = false; this.flagbar = false; this.flagpie = true; this.flagmap = false; } },
      { label: 'Map', icon: 'fas fa-map-marker', command: (onclick) => { this.flagline = false; this.flagbar = false; this.flagpie = false; this.flagmap = true; } }

    ];

    this.gmap = {
      center: { lat: 33.9189700, lng: 10.1657900 },
      zoom: 6
    };
    this.overlays = [
      new google.maps.Circle({ center: { lat: 36.8189700, lng: 10.1657900 }, fillColor: '#1976D2', fillOpacity: 0.30, strokeWeight: 1, radius: 30000 }),
      new google.maps.Circle({ center: { lat: 36.4000000, lng: 10.6166700 }, fillColor: '#1976D2', fillOpacity: 0.30, strokeWeight: 1, radius: 25000 }),
      new google.maps.Circle({ center: { lat: 37.2744200, lng: 9.8739100 }, fillColor: '#1976D2', fillOpacity: 0.30, strokeWeight: 1, radius: 27000 }),
      new google.maps.Circle({ center: { lat: 34.4426, lng: 10.4537 }, fillColor: '#1976D2', fillOpacity: 0.30, strokeWeight: 1, radius: 55000 }),
    ];
  }

  getAttributes() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getProductAttribute');
  }
  getOptions(attribute: string) {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getAttributeValue/' + attribute);
  }
  getCustomerGroup() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getCustomerGroup');
  }
  getPaymentMethod() {
    return this.http.get('http://ultravision/index.php/rest/V1/statistique/getPaymentMethod');
  }
  getShippingMethod() {
    return this.http.get('http://ultravision/rest/all/V1/statistique/getShippingMethod');
  }

  getChartsData() {
    this.flagSpinner = true;
    this.isCollapsed = true;
    this.flagCharts = false;
    this.flagFornewSearch = true;
    // dtata of charts
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }

    this.piedata = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

    this.bardata = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'My third dataset',
          backgroundColor: '#DF013A',
          borderColor: '#DF013A',
          data: [70, 20, 60, 51, 96, 30, 70]
        }
      ]
    }

    this.radardata = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };

    this.polardata = {
      datasets: [{
        data: [
          11,
          16,
          7,
          3,
          14
        ],
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED",
          "#36A2EB"
        ],
        label: 'My dataset'
      }],
      labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue"
      ]
    }

    this.Doughnutdata = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
    setTimeout(() => {
                       this.flagSpinner = false;
                       this.flagCharts = true;

                      },4000);
  }

  onChange() {
    if (this.model.product_attribute != "none") {
      this.getOptions(this.model.product_attribute).subscribe(data => { this.options = data; });
      this.modeoption = true;
    }
    else this.modeoption = false;

  }

  onChangeRadio() {

    if (this.model.customer_group == "General") { this.flagAge_Gender = true; }
    else this.flagAge_Gender = false;
  }

  readCsvData() {
    this._http.get("/assets/ville.csv")
      .subscribe(
        data => this.extractData(data)
      );
  }

  private extractData(res) {

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
        lines.push(tarr);
      }
    }
    this.ville = lines;
  }

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
      doc.addImage(image, 'JPEG', 15, 40, 150, 70);
    }
    if (this.flagline) {
      content = this.linecontent.nativeElement;
      let image = this.linechart.getBase64Image();
      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 200,
        'elementHandlers': specialElementHandlers
      });
      doc.addImage(image, 'JPEG', 15, 40, 150, 70);
    }
    if (this.flagpie) {
      content = this.piecontent.nativeElement;
      let pieimage = this.piechart.getBase64Image();
      let radarimage = this.radarchart.getBase64Image();
      let polarimage = this.polarchart.getBase64Image();
      let doughnutimage = this.doughnutchart.getBase64Image();
      doc.fromHTML(content.innerHTML, 15, 15, {
        'width': 200,
        'elementHandlers': specialElementHandlers
      });
      doc.addImage(pieimage, 'JPEG', -20, 30, 150, 70);
      doc.addImage(radarimage, 'JPEG', 80, 30, 150, 70);
      doc.addImage(polarimage, 'JPEG', -20, 180, 150, 70);
      doc.addImage(doughnutimage, 'JPEG', 80, 180, 150, 70);

    }

    doc.save('test.pdf');
  }

  clear(){
    this.model= new Vente(0, "", "", "","","","",{From:"",To:""},"","",0);
  }
  newSearch(){
    window.location.reload();
  }

}
