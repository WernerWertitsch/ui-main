import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListFrameComponent } from './entity-list-frame.component';

describe('EntityListFrameComponent', () => {
  let component: EntityListFrameComponent;
  let fixture: ComponentFixture<EntityListFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
