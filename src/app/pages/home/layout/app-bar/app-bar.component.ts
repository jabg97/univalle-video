import { Component, OnInit } from "@angular/core";
import { SideNavService } from "src/app/services/side-nav.service";
import { ScreenBreakpointService } from "src/app/services/breakpoint.service";

@Component({
  selector: "app-app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.css"]
})
export class AppBarComponent implements OnInit {
  constructor(
    public navService: SideNavService,
    public BP: ScreenBreakpointService
  ) {}

  visible = true;

  open() {
    this.visible = !this.visible;
  }

  ngOnInit() {}
}
