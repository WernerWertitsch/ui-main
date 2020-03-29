import {Injectable} from '@angular/core';

@Injectable()
export class TinyLogService {

  public lastUpdate: number;
  public maxLines = 50;
  public messages: {time: Date, text: string, error: boolean}[] = [];

  public addMessage(message:string, isError: boolean) {
    this.lastUpdate = Date.now();
    if(this.messages.length > this.maxLines) {
      this.messages = this.messages.slice(0, this.messages.length-1);
    }
    this.messages = [{time: new Date(), text: message, error: isError}].concat(this.messages);

  }


  clearAll() {
    this.messages.length = 0;
  }
}
