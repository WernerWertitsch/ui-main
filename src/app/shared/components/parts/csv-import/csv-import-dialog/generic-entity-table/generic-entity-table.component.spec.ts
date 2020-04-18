import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericEntityTableComponent } from './generic-entity-table.component';

describe('GenericEntityTableComponent', () => {
  let component: GenericEntityTableComponent;
  let fixture: ComponentFixture<GenericEntityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericEntityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericEntityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
