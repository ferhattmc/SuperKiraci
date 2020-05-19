import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
const apiUrl = "https://www.superkiraci.com/wp-json/wp/v2/users/";
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let request = { email: username, password: password };
    return this.http.post(apiUrl + "giris", request, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  register(credential: RegisterRequest): Observable<any> {
    // let request = { email: 'ferhattmc@gmail.com', first_name: first_name, last_name: last_name, password: password };
    return this.http.post(apiUrl + "uyeol", JSON.stringify(credential), httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


}
