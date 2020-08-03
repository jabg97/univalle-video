import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { ApiService } from "./services/api.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}
  canActivate(): boolean {
    if (!this.apiService.isLoggedIn) {
      this.router.navigate(["/login"]);
      return false;
    } else return true;
  }
}
