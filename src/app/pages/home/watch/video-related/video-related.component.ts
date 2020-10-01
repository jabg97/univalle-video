import {
  Component,
  OnInit,
  Input
} from "@angular/core";

@Component({
  selector: "app-video-related",
  templateUrl: "./video-related.component.html",
  styleUrls: ["./video-related.component.css"],
})
export class VideoRelatedComponent implements OnInit {
  constructor() {}

  @Input() videos: Array < any > ;
  @Input() later: Array < any > ;

  ngOnInit() {}
}
