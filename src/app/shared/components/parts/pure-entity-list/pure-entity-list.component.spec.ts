import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PureEntityListComponent } from './pure-entity-list.component';

describe('EntityListComponent', () => {
  let component: PureEntityListComponent;
  let fixture: ComponentFixture<PureEntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PureEntityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PureEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
