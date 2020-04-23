import {Injectable} from '@angular/core';
import { Stimmbericht} from "../domain";
import {TinyLogService} from "../../../shared/components/parts/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";
import {EntityRestService} from "../../../shared/service/abstract-rest/entity-rest-service";


@Injectable({
  providedIn: 'root'
})
export class StimmberichtClientService extends EntityRestService<Stimmbericht> {

  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super( "stimmberichts", httpClient, tinyLogService);
  }

}
