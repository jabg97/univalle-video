import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import {
  catchError
} from "rxjs/internal/operators";
import {
  Observable,
  throwError
} from "rxjs";
import {
  Injectable
} from "@angular/core";
import {
  Router
} from "@angular/router";
import {
  MatSnackBar
} from '@angular/material/snack-bar';




@Injectable({
  providedIn: "root"
})
export class ApiService {
  private url: string = "http://181.52.135.78:8081/api/";

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}


  login(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/login", data)
      .pipe(catchError(this.errorHandler));
  }

  register(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/register", data)
      .pipe(catchError(this.errorHandler));
  }

  subscribe(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/subscribe", data)
      .pipe(catchError(this.errorHandler));
  }

  desubscribe(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/desubscribe", data)
      .pipe(catchError(this.errorHandler));
  }

  update(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/update", data)
      .pipe(catchError(this.errorHandler));
  }

  user(id, user): Observable < any > {
    return this.http
      .get < any > (this.url + "auth/info/" + id + "/" + user, {})
      .pipe(catchError(this.errorHandler));
  }

  index(): Observable < any > {
    return this.http
      .get < any > (this.url + "video/index", {})
      .pipe(catchError(this.errorHandler));
  }

  subscriptions(id): Observable < any > {
    return this.http
      .get < any > (this.url + "video/subscriptions/" + id, {})
      .pipe(catchError(this.errorHandler));
  }

  query(query): Observable < any > {
    return this.http
      .post < any > (this.url + "video/query", {
        "query": query
      })
      .pipe(catchError(this.errorHandler));
  }

  watch(id, user): Observable < any > {
    return this.http
      .get < any > (this.url + "video/watch/" + id + "/" + user, {})
      .pipe(catchError(this.errorHandler));
  }

  upload(data): Observable < any > {
    return this.http
      .post < any > (this.url + "video/upload", data)
      .pipe(catchError(this.errorHandler));
  }

  like(data): Observable < any > {
    return this.http
      .post < any > (this.url + "video/like", data)
      .pipe(catchError(this.errorHandler));
  }

  dislike(data): Observable < any > {
    return this.http
      .post < any > (this.url + "video/dislike", data)
      .pipe(catchError(this.errorHandler));
  }

  delete(data): Observable < any > {
    return this.http
      .post < any > (this.url + "video/delete", data)
      .pipe(catchError(this.errorHandler));
  }

  video_update(data): Observable < any > {
    return this.http
      .post < any > (this.url + "video/update", data)
      .pipe(catchError(this.errorHandler));
  }

  comment(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/publish", data)
      .pipe(catchError(this.errorHandler));
  }

  comment_like(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/like", data)
      .pipe(catchError(this.errorHandler));
  }

  comment_dislike(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/dislike", data)
      .pipe(catchError(this.errorHandler));
  }
  comment_delete(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/delete", data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    this.snackBar.open("Server error: " + error.error.message + ".", '', {
      duration: 2000
    });
    console.log(error.error);
    return throwError(error.error || "Server error");
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem("user");
  }

  get getUser(): string {
    return localStorage.getItem("user");
  }

  get getUrl(): string {
    return this.url;
  }

  get getQuery(): string {
    return (localStorage.getItem("query")) ? localStorage.getItem("query") : "";
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigateByUrl("auth");
  }
}
