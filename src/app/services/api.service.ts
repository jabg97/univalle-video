import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/internal/operators";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";



@Injectable({
  providedIn: "root"
})
export class ApiService {
  private url: string = "http://localhost:3333/";

  constructor(private http: HttpClient, private router: Router) {}

  getEmpoyee(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(this.errorHandler));
  }
  getUser(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(this.errorHandler));
  }

  login(): Observable<any> {
    return this.http
      .post<any>(this.url+"login", null)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    localStorage.removeItem("token");
    return throwError(error.error || "Server error");
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  get getToken(): string {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate([""]);
  }
}
