import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  constructor() { }

  private subjects: Map<string, Rx.Subject<MessageEvent>> = new Map();

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subjects.has(url)) {
        let subject = this.create(url);
        this.subjects.set(url, subject);
        console.log("Successfully connected: " + url);
    } 

    return this.subjects.get(url);
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
    (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = ce => {
            obs.complete.bind(obs);
            this.create(url);
        }
        return ws.close.bind(ws);
    });

    let observer = {
        next: (data: Object) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
            }
        }
    }

    return Rx.Subject.create(observer, observable);
  }
}