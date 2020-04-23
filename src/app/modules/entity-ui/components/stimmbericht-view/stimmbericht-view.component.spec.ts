import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StimmberichtViewComponent } from './stimmbericht-view.component';

describe('PersonViewComponent', () => {
  let component: StimmberichtViewComponent;
  let fixture: ComponentFixture<StimmberichtViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StimmberichtViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StimmberichtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
