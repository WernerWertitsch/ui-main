import { Component, OnInit } from '@angular/core';
import {TinyLogService} from './tiny-log.service';

@Component({
  selector: 'app-tiny-log',
  templateUrl: './tiny-log.component.html',
  styleUrls: ['./tiny-log.component.css']
})
export class TinyLogComponent implements OnInit {

  stateOpen = false;
  lastOpen: number = 0;


  lastMessageState: {time: Date, text: string, error: boolean}[] = [];

  constructor(private tinyLogService: TinyLogService) {}

  ngOnInit() {

  }

  messages(): {time: Date, text: string, error: boolean}[] {
    return this.tinyLogService.messages;
  }

  opened($event: boolean) {
    if($event) {
      this.lastOpen = Date.now();
    }
  }

  newItems() {
    return this.tinyLogService.lastUpdate>this.lastOpen;
  }

  clear(): void {
    this.tinyLogService.clearAll();
  }
}
