import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/business/user/user.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should fetch uers', () => {
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
  });
});
