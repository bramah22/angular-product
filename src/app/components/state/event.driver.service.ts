import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ActionEvent} from "./product.state";

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {

  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();
  constructor() { }


  publishEvent(event: ActionEvent) {
    // Ainsi tous les composants qui ont subscribelnotre observation vont recevoir le message
    this.sourceEventSubject.next(event);
  }


}
