import {
  Component,
  OnInit
} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  ParamMap
} from "@angular/router";
import {
  ApiService
} from "../../../services/api.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  NgxSpinnerService
} from "ngx-spinner";
@Component({
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
  selector: "app-main"
})
export class MainComponent implements OnInit {
  videos: Array < any > ;
  title: any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) {
    if (!this._api.isLoggedIn) {
      this.router.navigateByUrl('auth')
    }

    this.videos = [];
    this.title = "";
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((param) => {

      const snackBar = this.snackBar;
      if (this.router.url.includes("/subscriptions")) {
        this.spinner.show();
        this._api.subscriptions(this._api.getUser).subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.videos = data.videos;
            this.title = "Suscripciones";
          } else {
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }

        });
      } else if (this.router.url.includes("/query")) {
        this.spinner.show();
        this._api.query(this._api.getQuery).subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.videos = data.videos;
            this.title = "Resultado Busqueda";
          } else {
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }

        });
      } else {
        this.spinner.show();
        this._api.index().subscribe(data => {
          console.log(data);
          this.spinner.hide();
          if (data.status == 200) {
            this.videos = data.videos;
            this.title = "Pagína Principal";
          } else {
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }

        });
      }
    });
  }
}
