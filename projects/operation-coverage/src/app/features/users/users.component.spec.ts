import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/core/services/business/user/user.service';

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
  });
});
