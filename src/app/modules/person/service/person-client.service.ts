import {Injectable} from '@angular/core';
import {GenericRestService} from "../../../shared/service/rest/generic-rest-service";
import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable} from "rxjs";
import {Person} from "../domain";
import {map} from "rxjs/operators";
import {ImportProgress} from "../../../shared/components/csv-import/importer";
import {TinyLogService} from "../../../shared/components/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";
import {PagableRestService, PageState} from "../../../shared/service/rest/pagable-rest-service";


@Injectable({
  providedIn: 'root'
})
export class PersonClientService extends PagableRestService<Person> {

  baseUrl: string = "/people";
  baseUrlFuzzy: string = "/people/fuzzy";
  baseUrlBulk: string = "/people/bulk";


  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super( httpClient, tinyLogService);
  }

  load(searchKey:string) {
    if(searchKey) {
      super.load(this.baseUrl);
    } else {
      const parameter = {
        n1: searchKey,
        n2: searchKey
      }
      super.load(this.baseUrlFuzzy, parameter);
    }
  }

  pushBulk(people: Person[]) {
    super.import(this.baseUrlBulk, people);
  }


}
