import {
  Component,
  OnInit
} from "@angular/core";
import {
  Router,ActivatedRoute
} from "@angular/router";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  NgForm
} from '@angular/forms';
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  ApiService
} from "../../../services/api.service";
@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
})
export class UploadComponent implements OnInit {

  public thumb: File;
  public video: File;
  user: any;
  edit: any;
  subs: any;
  id: any;
  user_id: any;
  state: any;
  constructor(
    private _api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute) {
    this.user = {};
    this.edit = {};
    this.subs = 0;
    this.id = 0;
    this.user_id = 0;
    this.state = 0;
  }
  VideoChange(event) {
    this.video = event.target.files[0];
    var video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      document.getElementById("duration").innerHTML = new Date(video.duration * 1000).
      toISOString().substr(11, 8);
    }
    video.src = URL.createObjectURL(this.video);
  }
  ThumbChange(event) {
    this.thumb = event.target.files[0];
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    var fSize = this.thumb.size;
    var i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    document.getElementById("size").innerHTML = (Math.round(fSize * 100) / 100) + ' ' + fSExt[i];
  }

  UploadSubmit(fu: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fu.valid) {
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("user_id", this._api.getUser);
      formData.append("nombre", fu.value.nombre);
      formData.append("descripcion", fu.value.descripcion);
      formData.append("video", this.video);
      formData.append("thumb", this.thumb);
      formData.append("duration", document.getElementById("duration").innerHTML);
      if (this.thumb) {
        if (this.video) {
          this.spinner.show();
          this._api.upload(formData).subscribe(data => {
            console.log(data);
            this.spinner.hide();
            if (data.status == 200) {
              router.navigateByUrl('watch/' + data.video);
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
          this.snackBar.open('Seleccione una miniatura.', '', {
            duration: 2000
          });
        }
      } else {
        this.snackBar.open('Seleccione un video.', '', {
          duration: 2000
        });
      }
    } else {
      this.snackBar.open('Formulario Incompleto.', '', {
        duration: 2000
      });
    }
  }
  UpdateSubmit(fu: NgForm) {
    const snackBar = this.snackBar;
    const router = this.router;
    if (fu.valid) {
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("user_id", this._api.getUser);
      formData.append("nombre", fu.value.nombre);
      formData.append("descripcion", fu.value.descripcion);
      formData.append("video", this.video);
      formData.append("thumb", this.thumb);
      formData.append("duration", document.getElementById("duration").innerHTML);
 
          this.spinner.show();
          this._api.video_update(formData).subscribe(data => {
            console.log(data);
            this.spinner.hide();
            if (data.status == 200) {
              router.navigateByUrl('watch/' + data.video);
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

  ngOnInit() {
    if (!this._api.isLoggedIn) {
      this.router.navigateByUrl('auth')
    }
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
    this.user_id = this._api.getUser

    const snackBar = this.snackBar;
    const router = this.router;
    if (this.user_id) {
      this.spinner.show();
      this._api.user(this.user_id, this._api.getUser).subscribe(data => {
        console.log(data);
        this.spinner.hide();
        if (data.status == 200) {
          this.user = data.user;
          this.subs = data.subs;
          this.state = data.state;
          if (this.id) {
            this.spinner.show();
            this._api.watch(this.id, this._api.getUser).subscribe(data => {
              console.log(data);
              this.spinner.hide();
              if (data.status == 200) {
                this.edit = data.video;
              } else {
                this.router.navigateByUrl('/channel')
                snackBar.open(data.message, '', {
                  duration: 2000
                });
              }
    
            });
          } 
        } else {
          this.router.navigateByUrl('')
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
    } else {
      this.router.navigateByUrl('')
      snackBar.open("El usuario no existe", '', {
        duration: 2000
      });
    }
  });
  }

}
