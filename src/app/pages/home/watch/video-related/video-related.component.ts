import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-video-related",
  templateUrl: "./video-related.component.html",
  styleUrls: ["./video-related.component.css"],
})
export class VideoRelatedComponent implements OnInit {
  constructor() {}

  items = Array(2)
    .fill(1)
    .map((item, index) => {
      return {
        title:
          "Aprende a hacer una mazamorra casera",
        channel: "Canal Random",
        views: "5K",
        month: "Hace "+(++index) + " meses",
      };
    });

  ngOnInit() {}
}
