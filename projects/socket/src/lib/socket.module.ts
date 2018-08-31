import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './socket.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WebsocketService
  ],
  exports: [
    WebsocketService
  ]
})
export class WebsocketModule { }
