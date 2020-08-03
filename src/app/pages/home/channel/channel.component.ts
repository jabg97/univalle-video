import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"],
})
export class ChannelComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((param) => {
      console.log(param.get("id"));
    });
  }

  ngOnInit() {}
}
