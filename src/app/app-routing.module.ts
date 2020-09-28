import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";


import { SideNavComponent } from "./pages/home/layout/side-nav/side-nav.component";
import { AppBarComponent } from "./pages/home/layout/app-bar/app-bar.component";
import { MenuComponent } from "./pages/home/main/menu/menu.component";
import { MainComponent } from "./pages/home/main/main.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./auth.guard";
import { WatchComponent } from "./pages/home/watch/watch.component";
import { ChannelComponent } from "./pages/home/channel/channel.component";
import { UploadComponent } from "./pages/home/upload/upload.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: MainComponent,
      },
      {
        path: "subscriptions",
        component: MainComponent,
      },
      {
        path: "query/:id",
        component: MainComponent,
      },
      {
        path: "watch/:id",
        component: WatchComponent,
      },
      {
        path: "channel",
        component: ChannelComponent,
      },
      {
        path: "channel/:id",
        component: ChannelComponent,
      },
      {
        path: "upload",
        component: UploadComponent,
      }    
    ],
  },
  {
    path: "auth",
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  WatchComponent,
  SideNavComponent,
  AppBarComponent,
  AuthComponent,
  HomeComponent,
  MainComponent,
  MenuComponent,
];
