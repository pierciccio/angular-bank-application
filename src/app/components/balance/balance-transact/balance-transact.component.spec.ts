import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransactComponent } from './balance-transact.component';

describe('BalanceTransactComponent', () => {
  let component: BalanceTransactComponent;
  let fixture: ComponentFixture<BalanceTransactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceTransactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
