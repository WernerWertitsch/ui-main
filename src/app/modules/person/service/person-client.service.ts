import {Injectable} from '@angular/core';
import {Person} from "../domain";
import {TinyLogService} from "../../../shared/components/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";
import {PagableRestService} from "../../../shared/service/rest/pagable-rest-service";


@Injectable({
  providedIn: 'root'
})
export class PersonClientService extends PagableRestService<Person> {

  baseUrl: string = "/people";
  baseUrlFuzzy: string = "/people/search/fuzzy";
  baseUrlBulk: string = "/people/bulk";


  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super( httpClient, tinyLogService);
  }

  load(searchKey:string) {
    const pageInfo = {...this.pageState$.value.pageInfo, ...{page: 0}};
    super.nextPageState({...this.pageState$.value, ...{pageInfo: pageInfo}});
    if(!searchKey) {
      super.fetch(this.baseUrl);
    } else {
      const parameter = {
        n1: searchKey,
        n2: searchKey
      }
      super.fetch(this.baseUrlFuzzy, false, parameter);
    }
  }


  pushBulk(people: Person[]) {
    super.import(this.baseUrlBulk, people);
  }


}
