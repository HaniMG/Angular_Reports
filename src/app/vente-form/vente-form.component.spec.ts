import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteFormComponent } from './vente-form.component';

describe('VenteFormComponent', () => {
  let component: VenteFormComponent;
  let fixture: ComponentFixture<VenteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
