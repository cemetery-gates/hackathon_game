import { Component } from "@angular/core";
import { Socket } from "ngx-socket-io";
import Mob from "./shared/mob";
import { HttpClient } from "@angular/common/http";
import PlayerJoinData from "./shared/playerJoinData";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "AsterRoyaleController";
  pushing: Mob = new Mob();
  player: PlayerJoinData;

  constructor(private socket: Socket, private http: HttpClient) {}

  registerPlayer(name: string) {
    if (name.length > 0) {
      this.http
        .get("/server/register/" + name)
        .subscribe((data: PlayerJoinData) => {
          this.player = data;
          this.pushing.id = data.id;
        });
    }
  }

  reset() {
    this.registerPlayer(this.player.name);
  }

  buttonPress(buttonName: string) {
    console.log('press ' + buttonName);
    switch (buttonName) {
      case "up":
        this.pushing.accelerate = true;
        break;
      case "left":
        this.pushing.turnLeft = true;
        break;
      case "right":
        this.pushing.turnRight = true;
        break;
      case "fire":
        this.pushing.shoot = true;
        break;

      default:
        break;
    }

    this.socket.emit("playerInput", this.pushing);
  }
  buttonRelease(buttonName) {
    console.log('release ' + buttonName);
    switch (buttonName) {
      case "up":
        this.pushing.accelerate = false;
        break;
      case "left":
        this.pushing.turnLeft = false;
        break;
      case "right":
        this.pushing.turnRight = false;
        break;
      case "fire":
        this.pushing.shoot = false;
        break;

      default:
        break;
    }

    this.socket.emit("playerInput", this.pushing);
  }
}
