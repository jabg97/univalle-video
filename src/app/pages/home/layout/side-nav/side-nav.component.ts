import { Component, OnInit } from "@angular/core";
import { SideNavService } from "src/app/services/side-nav.service";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  items = [
    {
      url:
        "https://yt3.ggpht.com/a/AGF-l7_fltNifNd4c9EQU-eBrh9ZbZwLxkj39Zjuug=s288-c-k-c0xffffffff-no-rj-mo",
      name: "Geeky Ranjit"
    },
    {
      url:
        "https://yt3.ggpht.com/a/AGF-l7_nC4ETFJCKV-TU3J1RLr2k3HVT25vVXMAiYw=s288-c-k-c0xffffffff-no-rj-mo",
      name: "Traversy Media"
    },
    {
      url:
        "https://yt3.ggpht.com/a/AGF-l7-L1jJvOCpat-6U8PVblQ_cSowHb42QQubFSw=s288-c-k-c0xffffffff-no-rj-mo",
      name: "Acadmind"
    },
    {
      url:
        "https://yt3.ggpht.com/a/AGF-l79FkXYtRM1Xh0v7-zvYTimNTfOsGtS8hSE7eg=s288-c-k-c0xffffffff-no-rj-mo",
      name: "Fireship"
    }
  ];
  constructor(public navService: SideNavService) {}
  ngOnInit() {}
}
