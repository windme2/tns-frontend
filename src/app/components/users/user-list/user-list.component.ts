import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {
    console.log('UserListComponent constructed');
  }

  ngOnInit(): void {
    console.log('UserListComponent initialized');
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';
    console.log('Loading users...');

    this.apiService.getUsers().subscribe({
      next: (data) => {
        console.log('Users loaded successfully:', data);
        if (Array.isArray(data)) {
          this.users = data;
        } else {
          console.error('Received data is not an array:', data);
          this.error = 'Invalid data format received';
        }
        this.loading = false;
      },
      error: (err) => {
        const errorDetails =
          err.error?.message || err.message || 'Unknown error';
        console.error('Error loading users:', err);
        this.error = `Failed to load users: ${errorDetails}`;
        this.loading = false;
      },
      complete: () => {
        console.log('User loading completed');
        this.loading = false;
      },
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    console.log('Deleting user:', id);
    this.apiService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.users = this.users.filter((user) => user.id !== id);
      },
      error: (err) => {
        const errorDetails =
          err.error?.message || err.message || 'Unknown error';
        console.error('Error deleting user:', err);
        this.error = `Failed to delete user: ${errorDetails}`;
      },
    });
  }
}
