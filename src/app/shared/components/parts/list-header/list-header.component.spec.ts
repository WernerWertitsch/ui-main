import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeader } from './list-header.component';

describe('FilterPageListComponent', () => {
  let component: ListHeader;
  let fixture: ComponentFixture<ListHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHeader ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
