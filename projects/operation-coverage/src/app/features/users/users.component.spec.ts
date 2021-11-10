import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/core/services/business/user/user.service';
import { User } from 'src/app/shared/models/user.model';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let template: HTMLElement;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('mockUserService', ['fetchUsers']);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [MatCardModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    mockUserService.fetchUsers.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should update users when user service returns users', () => {
      // Given
      mockUserService.fetchUsers.and.returnValue(
        of([
          {
            id: 1,
            email: 'george.bluth@reqres.in',
            firstName: 'George',
            lastName: 'Bluth',
            avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
          },
        ])
      );

      // When
      component.ngOnInit();

      // Then
      expect(component.users).toEqual([
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          firstName: 'George',
          lastName: 'Bluth',
          avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
        },
      ]);
    });

    it('should set isLoading to false', () => {
      // When
      component.ngOnInit();

      // Then
      expect(component.isLoading).toBe(false);
    });

    it('should update error when user service throws an error', () => {
      // Given
      mockUserService.fetchUsers.and.returnValue(throwError('fake error'));

      // When
      component.ngOnInit();

      // Then
      expect(component.error).toEqual('fake error');
    });
  });

  describe('ui tests', () => {
    it('should display loading element when loading', () => {
      // When
      component.isLoading = true;
      fixture.detectChanges();

      // Then
      const loadingEl = template.querySelector('[data-test="loading-el"]');
      expect(loadingEl).toBeTruthy();
    });

    it('should NOT display loading element when NOT loading', () => {
      // When
      component.isLoading = false;
      fixture.detectChanges();

      // Then
      const loadingEl = template.querySelector('[data-test="loading-el"]');
      expect(loadingEl).not.toBeTruthy();
    });

    it('should display error element when there is an error', () => {
      // When
      component.error = true;
      fixture.detectChanges();

      // Then
      const errorEl = template.querySelector('[data-test="error-el"]');
      expect(errorEl).toBeTruthy();
    });

    it('should NOT display error element when there is no error', () => {
      // When
      component.error = undefined;
      fixture.detectChanges();

      // Then
      const errorEl = template.querySelector('[data-test="error-el"]');
      expect(errorEl).not.toBeTruthy();
    });

    it('should display an element for each user', () => {
      // When
      component.users = [
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
      ];

      fixture.detectChanges();

      // Then
      expect(template.querySelectorAll('[data-test="user-el"]').length).toEqual(
        component.users.length
      );
    });
  });
});
