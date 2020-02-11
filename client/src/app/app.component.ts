import { Component } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "AsterRoyaleController";
  constructor(private socket: Socket) {
    this.socket.fromEvent("echo").subscribe(data => console.log(data));

    this.socket.emit("echo", "Angular Hello");
  }
}
