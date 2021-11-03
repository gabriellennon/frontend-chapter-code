import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#fetchUsers', () => {
    beforeEach(() => {
      // Given
      mockHttpClient.get.and.returnValue(
        of({
          page: 1,
          per_page: 10,
          total: 12,
          total_pages: 2,
          data: [
            {
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth',
              avatar: 'https://reqres.in/img/faces/1-image.jpg',
            },
            {
              id: 2,
              email: 'janet.weaver@reqres.in',
              first_name: 'Janet',
              last_name: 'Weaver',
              avatar: 'https://reqres.in/img/faces/2-image.jpg',
            },
            {
              id: 3,
              email: 'emma.wong@reqres.in',
              first_name: 'Emma',
              last_name: 'Wong',
              avatar: 'https://reqres.in/img/faces/3-image.jpg',
            },
            {
              id: 4,
              email: 'eve.holt@reqres.in',
              first_name: 'Eve',
              last_name: 'Holt',
              avatar: 'https://reqres.in/img/faces/4-image.jpg',
            },
            {
              id: 5,
              email: 'charles.morris@reqres.in',
              first_name: 'Charles',
              last_name: 'Morris',
              avatar: 'https://reqres.in/img/faces/5-image.jpg',
            },
            {
              id: 6,
              email: 'tracey.ramos@reqres.in',
              first_name: 'Tracey',
              last_name: 'Ramos',
              avatar: 'https://reqres.in/img/faces/6-image.jpg',
            },
            {
              id: 7,
              email: 'michael.lawson@reqres.in',
              first_name: 'Michael',
              last_name: 'Lawson',
              avatar: 'https://reqres.in/img/faces/7-image.jpg',
            },
            {
              id: 8,
              email: 'lindsay.ferguson@reqres.in',
              first_name: 'Lindsay',
              last_name: 'Ferguson',
              avatar: 'https://reqres.in/img/faces/8-image.jpg',
            },
            {
              id: 9,
              email: 'tobias.funke@reqres.in',
              first_name: 'Tobias',
              last_name: 'Funke',
              avatar: 'https://reqres.in/img/faces/9-image.jpg',
            },
            {
              id: 10,
              email: 'byron.fields@reqres.in',
              first_name: 'Byron',
              last_name: 'Fields',
              avatar: 'https://reqres.in/img/faces/10-image.jpg',
            },
          ],
          support: {
            url: 'https://reqres.in/#support-heading',
            text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
          },
        })
      );
    });

    it('should send get request with http client', () => {
      // When
      service.fetchUsers();

      // Then
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'https://reqres.in/api/users?per_page=10'
      );
    });

    it('should return a list of users', () => {
      // When
      service.fetchUsers().subscribe((val: any) => {
        expect(val).toEqual(
          jasmine.arrayContaining<User>([
            {
              id: 1,
              email: 'george.bluth@reqres.in',
              firstName: 'George',
              lastName: 'Bluth',
              avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
            },
          ])
        );
      });
    });
  });
});
