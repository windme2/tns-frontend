import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { Department } from '../../../models/department.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: 0,
    fullName: '',
    departmentId: 0,
    departmentName: ''
  };
  
  departments: Department[] = [];
  isEdit = false;
  loading = false;
  saving = false;
  error = '';
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadDepartments();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEdit = true;
      this.loadUser(+id);
    }
  }
  
  loadDepartments(): void {
    this.apiService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        this.error = 'Failed to load departments. Please try again later.';
        console.error('Error loading departments:', err);
      }
    });
  }
  
  loadUser(id: number): void {
    this.loading = true;
    this.apiService.getUser(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user. Please try again later.';
        console.error('Error loading user:', err);
        this.loading = false;
      }
    });
  }
  
  saveUser(): void {
    this.saving = true;
    this.error = '';
    
    const save$ = this.isEdit 
      ? this.apiService.updateUser(this.user)
      : this.apiService.createUser(this.user);
      
    save$.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.error = `Failed to ${this.isEdit ? 'update' : 'create'} user. Please try again later.`;
        console.error(`Error ${this.isEdit ? 'updating' : 'creating'} user:`, err);
        this.saving = false;
      }
    });
  }
}