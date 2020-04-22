import {BaseEntity} from "../../domain/base-domain";
import {EventEmitter, Input, OnInit, Output} from "@angular/core";
import {EntityService} from "../../service/entity-service";
import {Observable} from "rxjs";

export class AbstractSingleEntityView<T extends BaseEntity> implements OnInit {
  @Input()
  entity: T;

  @Input()
  entityService: EntityService<T>;

  @Output()
  entitySavedSuccess: EventEmitter<T> = new EventEmitter();


  fields$: Observable<string[]>;

  ngOnInit(): void {
    this.fields$ = this.entityService.getEntityFields$();
  }

  save(newEntity: T): Observable<T> {
    let ret = this.entityService.saveEntity(newEntity);
    ret.subscribe(e=> {
      this.entitySavedSuccess.emit(newEntity);
    });
    return ret;
  }






}
