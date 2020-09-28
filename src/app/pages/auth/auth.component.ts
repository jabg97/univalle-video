import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  ActivatedRoute,
  Router,
  ParamMap
} from "@angular/router";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  NgForm
} from '@angular/forms';

import {
  ApiService
} from "../../services/api.service";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  constructor(
  
    private route: ActivatedRoute,
    private router: Router,
    private _api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  public params: number;
  LoginSubmit(fl: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fl.valid) {
      this._api.login(fl.value).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
          localStorage.setItem('user', data.user);
          router.navigateByUrl('');
          snackBar.open(data.message, '', {
            duration: 2000
          });
        } else {
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
    } else {
      this.snackBar.open('Formulario Incompleto.', '', {
        duration: 2000
      });
    }
  }
  RegisterSubmit(fr: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fr.valid) {
      if (fr.value.password == fr.value.repassword) {
      this._api.register(fr.value).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
          localStorage.setItem('user', data.user);
          router.navigateByUrl('');
          snackBar.open(data.message, '', {
            duration: 2000
          });
        } else {
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
    } else {
      this.snackBar.open("Las contraseñas no coinciden.", '', {
        duration: 2000
      });
    }
    } else {
      this.snackBar.open('Formulario Incompleto.', '', {
        duration: 2000
      });
    }
  }
  ngOnInit() {
    if(this._api.isLoggedIn){
      this.router.navigateByUrl('')
    }
  }
}
