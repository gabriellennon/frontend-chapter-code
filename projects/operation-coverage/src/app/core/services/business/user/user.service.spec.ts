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
          ],
          support: {
            url: 'https://reqres.in/#support-heading',
            text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
          },
        })
      );
    });

    it('should make http get call', () => {
      // When
      service.fetchUsers();

      // Then
      expect(mockHttpClient.get).toHaveBeenCalled();
    });

    it('should make http get call to correct url', () => {
      // When
      service.fetchUsers();

      // Then
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        'https://reqres.in/api/users?per_page=10'
      );
    });

    it('should return an observable of a list of users', () => {
      // When
      service.fetchUsers().subscribe((val: User[]) => {
        // Then
        expect(val).toEqual([
          {
            id: 1,
            email: 'george.bluth@reqres.in',
            firstName: 'George',
            lastName: 'Bluth',
            avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
          },
          {
            id: 2,
            email: 'janet.weaver@reqres.in',
            firstName: 'Janet',
            lastName: 'Weaver',
            avatarUrl: 'https://reqres.in/img/faces/2-image.jpg',
          },
        ]);
      });
    });
  });
});
