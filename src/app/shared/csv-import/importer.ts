import { Injectable } from '@angular/core';
import { ReplaySubject} from 'rxjs';
import {BaseEntity} from "../domain/base-domain";
import {TinyLogService} from "../tiny-log/tiny-log.service";


export class Importer<T extends BaseEntity> {
  readonly TYPE = "com.wecreate.services.person.model.Person";
  objects: ReplaySubject<T[]> = new ReplaySubject();

  public delimiter: string=";";

  constructor(private tinyLogService: TinyLogService) { }

  load(blob: Blob, forcedArrayFields: string[] = []): void {
    let reader = new FileReader();
    reader.onload = (data) => {
      let lines = this.getLines(reader.result as string);
      let fields = this.getFields(lines[0], this.delimiter);
      let result: T[] = [];
      this.tinyLogService.addMessage("Reading file, "+lines.length+" lines..", false);
      for(let i=1; i<lines.length; i++) {
        if(lines[i].length>0) {
          let obj = this.createObject(lines[i], this.delimiter, fields, this.TYPE, forcedArrayFields);
          if(obj) {
            this.tinyLogService.addMessage("Created Object, from line "+(i+1)+", object resulting:"+obj, false);
            result.push(obj);
          }
        }
      }
      this.tinyLogService.addMessage("Done reading file, "+lines.length+" lines processed..", false);
      this.objects.next(result);
    }
    reader.readAsText(blob, "UTF-8");
  }


  private getLines(data: string) {
    return data.split("\n");
  }

  private getFields(headerLine: string, delimiter: string): string[] {
    return headerLine.trim().split(delimiter);
  }

  private createObject(line: string, delimiter: string, fields: string[], type: string, forcedArrayFields: string[]): T {
    const obj = new Object();
    try {
      let data = line.split(delimiter);
      if(!data || data.length<2) {
        this.tinyLogService.addMessage("The delimiter '"+delimiter+"' does not seem to work for line "+line+". Try another delimiter", true);
        return undefined;
      }
      for(let i=0; i<data.length; i++) {
        let value;
        if(data[i].startsWith("[")) {
          value = JSON.parse(data[i]);
        } else {
          value = forcedArrayFields.indexOf(fields[i]) >= 0 ? [data[i]] : data[i];
        }
        obj[fields[i]]= value;
      }
    } catch (e) {
      this.tinyLogService.addMessage(`Could not parse line: ${line}`, true );
    }

    return obj as T;
  }
}


