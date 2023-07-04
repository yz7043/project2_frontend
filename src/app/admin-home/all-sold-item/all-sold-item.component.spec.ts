import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSoldItemComponent } from './all-sold-item.component';

describe('AllSoldItemComponent', () => {
  let component: AllSoldItemComponent;
  let fixture: ComponentFixture<AllSoldItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSoldItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSoldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
