import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    //Falando pra request continuar depois que passar por aqui
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      //Já o append ele adicionar e não sobrescreve se já existia algo
      // headers: request.headers.append(
      //   DefaultInterceptor.X_HEADER,
      //   '<<some value>>'
      // )

      //O set header ele sobrescresve
      setHeaders: {
        'X-Header': '<<value>>',
      },
    });
    return next.handle(request);
  }
}
