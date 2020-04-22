import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractSingleEntityView} from "../abstract-single-entity-view";
import {BaseEntity} from "../../../domain/base-domain";

@Component({
  selector: 'app-single-entity',
  templateUrl: './single-entity.component.html',
  styleUrls: ['./single-entity.component.scss']
})
export class SingleEntityComponent<T extends BaseEntity> extends AbstractSingleEntityView<T> implements OnInit {

  readonly fieldTypes = FieldType;


  @Input()
  nonEditableFields: string[] = ["id"];

  @Input()
  titleIconName: string = "person_pin";

  @Input()
  title: string = "no title set";

  @Input()
  $entityContextComponent: ElementRef<any>;

  @Input()
  nonSimpleFieldTypes: {[id:string]:FieldType} = {};

  @Input()
  editMode: boolean = false;

  // @Output()
  // editingDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  editObject: T;
  showContext: boolean = false;
  processing: boolean = false;


  ngOnInit(): void {
    super.ngOnInit();
    this.editObject = {...this.entity};
  }

  editModeOn()  {
    this.editMode = true;
  }

  saveAfterEdit() {
    this.processing = true;
    this.save(this.editObject);
    this.editMode=false;
    // this.editingDone.emit(true);
  }

  cancel() {
    this.editObject = {...this.entity};
    this.editMode = false;
    // this.editingDone.emit(false);
  }

  isSimpleField(fName: string) {
    return (!this.nonSimpleFieldTypes[fName] || this.nonSimpleFieldTypes[fName] === this.fieldTypes.simple)
      && !Array.isArray(this.entity[fName]);
  }

  isList(fName: string) {
    if (this.nonSimpleFieldTypes[fName] && this.nonSimpleFieldTypes[fName] === this.fieldTypes.stringList) {
      return true;
    }
    return Array.isArray(this.entity[fName]);
  }

  isEditable(fName: string): boolean {
    return this.nonEditableFields.indexOf(fName)<0;
  }

  /* this is actually a workaroundk otherwise you cant use array indices properly with input fields (loses focus)
   *https://stackoverflow.com/questions/42322968/angular2-dynamic-input-field-lose-focus-when-input-changes
   */
  trackByFn(index: any, item: any) {
    return index;
  }
}

export enum FieldType {
  simple,
  stringList
}
