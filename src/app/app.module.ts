import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";

import { VgOverlayPlayModule } from "videogular2/compiled/overlay-play";
import { VgBufferingModule } from "videogular2/compiled/buffering";
import { VgControlsModule } from "videogular2/compiled/controls";
import { VgCoreModule } from "videogular2/compiled/core";

import { VideoRelatedComponent } from "./pages/home/watch/video-related/video-related.component";
import { WatchComponent } from "./pages/home/watch/watch.component";
import { TokenIntercepterService } from "./services/token-intercepter.service";
import { AppRoutingModule, RoutingComponents } from "./app-routing.module";
import { ScreenBreakpointService } from "./services/breakpoint.service";
import { SideNavService } from "./services/side-nav.service";
import { MaterialModule } from "./components/material/material.module";
import { ApiService } from "./services/api.service";
import { AppComponent } from "./app.component";
//import { AuthGuard } from "./auth.guard";
import { ChannelComponent } from './pages/home/channel/channel.component';
import { UploadComponent } from './pages/home/upload/upload.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    WatchComponent,
    VideoRelatedComponent,
    ChannelComponent,
    UploadComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    LayoutModule,
    FormsModule,
    MatSnackBarModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    TokenIntercepterService,
    ScreenBreakpointService,
    SideNavService,
    ApiService,
    //AuthGuard,
    {
      useClass: TokenIntercepterService,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
})
export class AppModule {}
