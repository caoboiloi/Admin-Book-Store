import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
    private events: any = {};

    constructor() { }

    public On(eventName: PubSubEvents): Observable<any> {

        if (typeof this.events[eventName] === 'undefined') {
            this.events[eventName] = new Subject<any>();
        }

        return this.events[eventName].asObservable();
    }

    public Broadcast(eventName: PubSubEvents, eventArgs: any) {
        if (!this.events[eventName]) {
            return;
        }

        this.events[eventName].next(eventArgs);
    }
}

export declare type PubSubEvents = "account";
