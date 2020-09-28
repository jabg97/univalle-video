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
  ApiService
} from "../../../services/api.service";
@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"],
})
export class ChannelComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private _api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar) {
      this.user = {};
      this.subs = 0;
      this.id = 0;
      this.state = 0;
      this.videos = [];
      this.subscriptions = [];
    }

    id: any;
    user: any;
    subs: any;
    state: any;
    videos: Array<any>;
    subscriptions: Array<any>;
    public profile:File;
    public banner:File;

    subscribe(id) {
      let requestData = {"user":id,"sub": this._api.getUser} 
      const snackBar = this.snackBar;
      this._api.subscribe(requestData).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
          this.state = 2;
        this.subs++;
          snackBar.open(data.message, '', {
            duration: 2000
          });
        } else {
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
    }

    desubscribe(id) {
      let requestData = {"user":id,"sub": this._api.getUser} 
      const snackBar = this.snackBar;
      this._api.desubscribe(requestData).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
            this.state = 1;
            this.subs--;
          snackBar.open(data.message, '', {
            duration: 2000
          });
        } else {
          snackBar.open(data.message, '', {
            duration: 2000
          });
        }

      });
      }

      desubscribe_reload(id) {
        let requestData = {"user":id,"sub": this._api.getUser} 
        const snackBar = this.snackBar;
        this._api.desubscribe(requestData).subscribe(data => {
          console.log(data);
          if (data.status == 200) {
              location.reload();
            snackBar.open(data.message, '', {
              duration: 2000
            });
          } else {
            snackBar.open(data.message, '', {
              duration: 2000
            });
          }
  
        });
        }

    ProfileChange(event) {
      this.profile = event.target.files[0]; 
      var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
      var fSize = this.profile.size ; var i=0;while(fSize>900){fSize/=1024;i++;}
      document.getElementById("size2").innerHTML = (Math.round(fSize*100)/100)+' '+fSExt[i]; 
    }

    BannerChange(event) {
      this.banner = event.target.files[0]; 
      var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
      var fSize = this.banner.size ; var i=0;while(fSize>900){fSize/=1024;i++;}
      document.getElementById("size").innerHTML = (Math.round(fSize*100)/100)+' '+fSExt[i]; 
    }

    UserSubmit(fu: NgForm) {
      const snackBar = this.snackBar;
      const router = this.router;
      if (fu.valid) {
  let formData = new FormData(); 
  formData.append("user_id", this._api.getUser); 
  formData.append("bio", fu.value.bio);
  formData.append("profile", this.profile);
  formData.append("banner", this.banner);

        this._api.update(formData).subscribe(data => {
          console.log(data);
          if (data.status == 200) {
            window.location.reload();
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
    if(!this._api.isLoggedIn){
      this.router.navigateByUrl('auth')
    }
    this.activatedRoute.paramMap.subscribe((param) => {
      if(param.get("id")){
        this.id = param.get("id");
      }else{
        this.id = this._api.getUser;
      }
      const snackBar = this.snackBar;
    const router = this.router;
    if(this.id){
      this._api.user(this.id,this._api.getUser).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
          this.user = data.user;
          this.subs = data.subs;
          this.state = data.state;
          this.videos = data.videos;
          this.subscriptions = data.subscriptions;
          
        } else {
          this.router.navigateByUrl('')
          snackBar.open(data.message, '', {
               duration: 2000
             });
        }

      });
    }else{
      this.router.navigateByUrl('')
       snackBar.open("El usuario no existe", '', {
            duration: 2000
          });
    }
    });
    

  }
}
