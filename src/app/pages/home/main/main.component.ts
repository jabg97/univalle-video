import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
  selector: "app-main"
})
export class MainComponent implements OnInit {
  rows: Array<any>;
  public text =
    "Central Stags V Chennai Super Kings Highlists:Airtel Clt20 News";
  constructor( private router: Router,
    private route: ActivatedRoute) {
    if(!localStorage.getItem('currentUser')){
      this.router.navigateByUrl('login')
    }
    this.rows = [
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLwA0pNEolpoeLsLPj-TUo3sZNBVt3mNLFkw&usqp=CAU",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS884yE-aP3PQdStnZ7KZecX04EDdYa2YpRgQ&usqp=CAU",
        text: "Pasión de gavilanes Temporada 1 MEGA -:- 1 link Español Latino",
        channel: "Mi canal",
        views: "140",
        old: "2 Meses",
        time: "05:44"
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTmAVstHLq34KTUjsLsItu2IOEMWvpHOzbtA&usqp=CAU",
        profile:
          "data:image/jpeg;base64,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",
        text: "Lo mejor del Charrito Negro",
        channel: "Mi canal",
        views: "26M",
        old: "2 Meses",
        time: "05:44"
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJNeN37QcDUmpC109NltWaJmIyBgQJXdwdDQ&usqp=CAU",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKRCfg2xIu9yLGDGiAXcw56FM5zjIvvCPsfQ&usqp=CAU",
        text: "Salsa Romantica",
        channel: "Mi Canal",
        views: "1M",
        old: "9 Horas",
        time: "1:47:00"
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT95KkJ9giaKctWdg03iXH3cajBehnZXZs_9Q&usqp=CAU",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMFS8axeLfkZEHmwiwACr2g903NIxXHG-Dcg&usqp=CAU",
        text: "Cantores del chipuco",
        channel: "Mi Canal",
        views: "500K",
        old: "27 años",
        time: "47:32"
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3BzKyIv2cUIL2UGno2pESSFUmEaZ_jKhL0w&usqp=CAU",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU",
        text: "Musica de Despecho",
        channel: "Mi Canal",
        views: "12M",
        old: "2 años",
        time: "01:02"
      },
      {
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTjvYUT-m6QQnRZuf9HhkjeegIE16_xpeedOQ&usqp=CAU",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRW6X2lldt_gy2tcbXCKBbKWNVBpH-f1Mcjsw&usqp=CAU",
        text: "Merengue",
        channel: "Mi Canal",
        views: "2M",
        old: "3 años",
        time: "5:22:00"
      }
    ];
  }

  ngOnInit() {}
}
