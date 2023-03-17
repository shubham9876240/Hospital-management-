import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private login:LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // Add the jwt token (local storage ) request
    const token = this.login.getToken();

    //console.log('inside instercepotr');

    if (token != null) {
      const cloned  = req.clone({
        setHeaders: {
           'Content-Type' : 'application/json; charset=utf-8',
           'Accept'       : 'application/json',
          'Authorization': `Bearer ${token}`},
        },
        );

        return next.handle(cloned);

    }
    
    return next.handle(req);
  }

}

// export const authInterceptorProviders = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: AuthInterceptor,
//     multi: true
//   }
// ];