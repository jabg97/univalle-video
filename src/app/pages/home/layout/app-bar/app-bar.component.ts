import {
  Component,
  OnInit
} from "@angular/core";
import {
  SideNavService
} from "src/app/services/side-nav.service";
import {
  ScreenBreakpointService
} from "src/app/services/breakpoint.service";
import {
  ApiService
} from "../../../../services/api.service";
import {
  Router
} from "@angular/router";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
@Component({
  selector: "app-app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.css"]
})
export class AppBarComponent implements OnInit {
  constructor(
    public navService: SideNavService,
    public BP: ScreenBreakpointService,
    private _api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.query = this._api.getQuery;
  }

  visible = true;
  query: string;

  search() {
    localStorage.setItem('query', this.query);
    this.router.navigateByUrl('query/' + btoa(this.query));
  }

  open() {
    this.visible = !this.visible;
  }

  logout() {
    this._api.logout();
  }

  ngOnInit() {}
}
