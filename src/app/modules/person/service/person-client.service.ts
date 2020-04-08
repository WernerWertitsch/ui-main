import {Injectable} from '@angular/core';
import {GenericRestService} from "../../../shared/graphql/generic-rest-service";
import {Apollo} from "apollo-angular";
import {BehaviorSubject, Observable} from "rxjs";
import {Person} from "../domain";
import {map} from "rxjs/operators";
import {ImportProgress} from "../../../shared/csv-import/importer";
import {TinyLogService} from "../../../shared/tiny-log/tiny-log.service";
import {HttpClient} from "@angular/common/http";

const MAX_ERRORS = 5;

@Injectable({
  providedIn: 'root'
})
export class PersonClientService extends GenericRestService<Person> {

  constructor(httpClient: HttpClient, tinyLogService: TinyLogService) {
    super(httpClient, tinyLogService, MAX_ERRORS);
  }

  navigate


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

  createPersons(persons: Person[]): Observable<Person> {
    // let personAsString = this.removePropertyNameApostrophes(JSON.stringify(person)
    //   .replace("\{", "\(")
    //   .replace("\}", "\)"));
    const bulkObject = JSON.stringify({
      persons: persons
    }).replace(/"([^"]+)":/g, '$1:');;
    return this.mutation<Person>(`mutation {
      createPersons(input: ${bulkObject})
       {
        id
        lastname
        firstname
        email
        phone
        birthdate
        dateCreated
      }
    }`, "createPersons", undefined);
  }

  createPerson(person: Person): Observable<Person> {

    let personAsString = this.removePropertyNameApostrophes(JSON.stringify(person)
      .replace("\{", "\(")
      .replace("\}", "\)"));

    // Try if this works..
    // const personAsString = JSON.stringify(person).replace(/"([^"]+)":/g, '$1:');

    return this.mutation<Person>(`mutation {
      createPerson${personAsString}
       {
        id
        lastname
        firstname
        email
        phone
        birthdate
        dateCreated
      }
    }`, "createPerson", undefined);
  }

  //TODO this can be done more elegantly
  private removePropertyNameApostrophes(propertyDef: string): string {
    const arraySeparation = propertyDef.split("\[");
    const ret: string[] = [];
    for(let x=0; x<arraySeparation.length; x++) {
      const lines = arraySeparation[x].split(",");
      const cleanedLines: string[] = [];
      for(let i=0; i<lines.length; i++) {
        if(lines[i].indexOf(":")>0) {
          const line = lines[i].split(":");
          line[0] = line[0].replace("\"", "").replace("\"", "");
          lines[i] = line.join("\:");
        }
        // cleanedLines.push(line.join(":"));
      }
      ret.push(lines.join("\,\n\r"))
    }
    return ret.join("\[");
  }


}
