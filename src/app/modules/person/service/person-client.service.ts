import {Injectable} from '@angular/core';
import {Person} from "../domain";
import {TinyLogService} from "../../../shared/components/parts/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";
import {PagableRestService} from "../../../shared/service/abstract-rest/pagable-rest-service";
import {EntityRestService} from "../../../shared/service/abstract-rest/entity-rest-service";


@Injectable({
  providedIn: 'root'
})
export class PersonClientService extends EntityRestService<Person> {

  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super( "people", httpClient, tinyLogService);
  }

}
