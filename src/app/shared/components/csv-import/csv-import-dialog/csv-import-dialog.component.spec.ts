import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvImportDialogComponent } from './csv-import-dialog.component';

describe('CsvImportDialogComponent', () => {
  let component: CsvImportDialogComponent;
  let fixture: ComponentFixture<CsvImportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvImportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
