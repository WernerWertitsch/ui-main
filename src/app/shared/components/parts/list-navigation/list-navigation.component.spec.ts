import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNavigationComponent } from './list-navigation.component';

describe('PagingComponent', () => {
  let component: ListNavigationComponent;
  let fixture: ComponentFixture<ListNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
