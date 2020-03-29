import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyLogComponent } from './tiny-log.component';

describe('TinyLogComponent', () => {
  let component: TinyLogComponent;
  let fixture: ComponentFixture<TinyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
