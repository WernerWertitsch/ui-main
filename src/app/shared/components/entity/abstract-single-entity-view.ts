import {BaseEntity} from "../../domain/base-domain";
import {EventEmitter, Input, OnInit, Output} from "@angular/core";
import {EntityService} from "../../service/entity-service";
import {Observable} from "rxjs";

export class AbstractSingleEntityView<T extends BaseEntity> implements OnInit {
  @Input()
  entity: T;

  @Input()
  byId: string;

  @Input()
  entityService: EntityService<T>;

  @Output()
  entitySavedSuccess: EventEmitter<T> = new EventEmitter();


  fields$: Observable<string[]>;

  ngOnInit(): void {
    if(!this.entity) {
      this.entityService.loadEntity(this.byId).subscribe(e => this.entity = e);
      this.fields$ = this.entityService.getEntityFields$(); //its possible that sometimes no object of this type has been loaded yet (person displayed, but o address yet loaded), so can only happen of the first is loaded
    } else {
      //if the entity is set diretly we likely already have all the necessary fields
      this.fields$ = this.entityService.getEntityFields$();
    }

  }

  save(newEntity: T): void {
   this.entityService.saveEntity(newEntity);
  }






}
