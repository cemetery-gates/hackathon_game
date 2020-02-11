import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const config: SocketIoConfig = { url: "/", options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
