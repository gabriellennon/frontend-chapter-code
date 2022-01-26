import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultInterceptor } from './default.interceptor';
import { Observable } from 'rxjs';

@Injectable()
class AnyService {
  constructor(private http: HttpClient) {}

  anyMethod():Observable<any>{
    return this.http.get('/any');
  }
}

describe('DefaultInterceptor', () => {
  let service: AnyService;
  let testingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnyService, { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }]
    });

    service = TestBed.inject(AnyService);
    testingController = TestBed.inject(HttpTestingController);
  });

  //Given

  //When - quando houver uma request http
  it('should addheader to request', () => {
      service.anyMethod().subscribe();
      // Then - eu espero que o header esteja anexado a request
      const mockRequest = testingController.expectOne('/any').request;
      expect(mockRequest.headers.has('X-Header')).toBeTrue();
      //Varificando o valor que colocamos no interceptor, se é igual
      expect(mockRequest.headers.get('X-Header')).toEqual('<<value>>')
  });

 

});
