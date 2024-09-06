import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  validateLogin(user: string, password: string) {
    const url = 'http://localhost:3000/users?user={email}&password={password}'.replace('{email}', user).replace('{password}', password);
    return this.http.get<any>(url).pipe(switchMap(response => {
      if (response.length === 0) {
        return throwError(() => new HttpErrorResponse({}));
      }
      return of(response);
    }));
  }
}
