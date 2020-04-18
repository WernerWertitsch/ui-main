import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PureEntityTableComponent } from './pure-entity-table.component';

describe('PureEntityTableComponent', () => {
  let component: PureEntityTableComponent;
  let fixture: ComponentFixture<PureEntityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PureEntityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PureEntityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
