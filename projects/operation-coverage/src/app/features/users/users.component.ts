import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/business/user/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users?: User[];
  isLoading: boolean = true;
  error: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      },
    });
  }
}
