import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsMostProfitComponent } from './items-most-profit.component';

describe('ItemsMostProfitComponent', () => {
  let component: ItemsMostProfitComponent;
  let fixture: ComponentFixture<ItemsMostProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsMostProfitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsMostProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
