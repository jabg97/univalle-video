import { Component, OnInit, OnDestroy } from "@angular/core";
import { VgAPI } from "videogular2/compiled/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import {
  ApiService
} from "../../../services/api.service";
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { SideNavService } from "../../../services/side-nav.service";
import {
  NgForm
} from '@angular/forms';

@Component({
  selector: "app-watch",
  templateUrl: "./watch.component.html",
  styleUrls: ["./watch.component.css"]
})
export class WatchComponent implements OnInit, OnDestroy {
  preload: string = "auto";
  api: VgAPI;
  video: any;
  comments: Array<any>;
  videos: Array<any>;
  later: Array<any>;
  id: any;
  url: any;
  state: any;
  comments_count: any;
  user: any;
  subs: any;
  comment_text: string;
  constructor(private navService: SideNavService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _api: ApiService,
    private snackBar: MatSnackBar) {
      this.video = {};
      this.user = {};
      this.subs = 0;
      this.id = 0;
      this.state = 0;
      this.comments_count = 0;
      this.comments = [];
      this.videos = [];
      this.later = [];
      this.comment_text = "";
      this.navService.closeNav();
    this.navService.setWatch(true);
    }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.api.getDefaultMedia().currentTime = 0;
    });
    
  }

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

    CommentSubmit(fc: NgForm) {
      const snackBar = this.snackBar;
    const router = this.router;
    if (fc.valid) {
      let requestData = fc.value;
      this._api.comment(requestData).subscribe(data => {
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
    } else {
      this.snackBar.open('Formulario Incompleto.', '', {
        duration: 2000
      });
    }
      }

      like(id) {
      let requestData = {"id":id} 
      const snackBar = this.snackBar;
      this._api.likes(requestData).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
          this.video.likes++;
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

      dislike(id) {
        let requestData = {"id":id} 
        const snackBar = this.snackBar;
        this._api.dislikes(requestData).subscribe(data => {
          console.log(data);
          if (data.status == 200) {
            this.video.dislikes++;
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

  ngOnInit() {
    if(!this._api.isLoggedIn){
      this.router.navigateByUrl('auth')
    }
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.url = this._api.getUrl;
    const snackBar = this.snackBar;
    const router = this.router;
    
    if(this.id){
      this._api.watch(this.id, this._api.getUser).subscribe(data => {
        console.log(data);
        if (data.status == 200) {
          this.video = data.video;
          this.subs = data.subs;
          this.state = data.state;
          this.comments = data.comments;
          this.comments_count = data.comments_count;
          this.later = data.later;
          this.videos = data.videos;
          this.user = data.user;
          
          var video = document.getElementsByTagName('video')[0];
          var sources = video.getElementsByTagName('source');
          sources[0].src = this.video.src;
          video.load();
        } else {
          this.router.navigateByUrl('')
          snackBar.open(data.message, '', {
               duration: 2000
             });
        }

      });
    }else{
      this.router.navigateByUrl('')
       snackBar.open("El video no existe", '', {
            duration: 2000
          });
    }
    });
    

  }

  ngOnDestroy() {
    this.navService.setWatch(false);
  }
}
