import { NgModule } from '@angular/core';
import { WebsocketService } from './socket.service';

@NgModule({
  declarations: [
    WebsocketService
  ],
  imports: [
    NgModule,
  ],
  exports: [
    WebsocketService
  ]
})
export class WebsocketModule { }
