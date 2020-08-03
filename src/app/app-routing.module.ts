import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";


import { SideNavComponent } from "./pages/home/layout/side-nav/side-nav.component";
import { AppBarComponent } from "./pages/home/layout/app-bar/app-bar.component";
import { MenuComponent } from "./pages/home/main/menu/menu.component";
import { MainComponent } from "./pages/home/main/main.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./auth.guard";
import { WatchComponent } from "./pages/home/watch/watch.component";
import { ChannelComponent } from "./pages/home/channel/channel.component";

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
        path: "watch/:id",
        component: WatchComponent,
      },
      {
        path: "channel/:id",
        component: ChannelComponent,
      }
    ],
  },
  {
    path: "login",
    component: LoginComponent,
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
  LoginComponent,
  HomeComponent,
  MainComponent,
  MenuComponent,
];
