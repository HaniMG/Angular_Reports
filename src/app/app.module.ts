import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import 'rxjs/add/operator/map';
import { VenteFormComponent } from './vente-form/vente-form.component'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardModule} from 'primeng/card';
import {GMapModule} from 'primeng/gmap';
import {AccordionModule} from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {RouterModule, Routes} from '@angular/router';
import {FieldsetModule} from 'primeng/fieldset';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';





const appRoutes: Routes=[]
@NgModule({
  declarations: [
    AppComponent,
    VenteFormComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModule.forRoot(),
    CardModule,
    GMapModule,
    AccordionModule,
    BrowserAnimationsModule,
    TabMenuModule,
    TabViewModule,
    FieldsetModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
