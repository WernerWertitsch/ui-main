import {Injectable} from '@angular/core';
import {AbstractGraphqlService} from "../../../shared/graphql/graphql-service";
import {Apollo} from "apollo-angular";
import {Observable} from "rxjs";
import {Person} from "../domain";
import {map} from "rxjs/operators";

const MAX_ERRORS = 5;

@Injectable({
  providedIn: 'root'
})
export class PersonClientService extends AbstractGraphqlService {

  constructor(apollo: Apollo) {
    super(apollo, MAX_ERRORS);
  }

  watchAllPersons(): Observable<Person[]> {
    return this.watch<Person[]>(`query {
      findAllPersons {
        id
        lastname
        firstname
        email
        phone
        birthdate
        dateCreated
      }
    }`, "findAllPersons", []).pipe(
      map(persons => persons.map(p => { //this maps the string fields to date fields, by creating a new object
        return {...p, ...{
            birthdate: p.birthdate ? new Date(p.birthdate):undefined,
            dateCreated: new Date(p.dateCreated)
        }}
      }))
    );
  }



}
