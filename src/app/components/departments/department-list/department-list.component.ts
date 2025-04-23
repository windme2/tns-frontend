import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Department } from '../../../models/department.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {
    console.log('DepartmentListComponent constructed');
  }

  ngOnInit(): void {
    console.log('DepartmentListComponent initialized');
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.error = '';
    console.log('Loading departments...');

    this.apiService.getDepartments().subscribe({
      next: (data) => {
        console.log('Departments loaded successfully:', data);
        if (Array.isArray(data)) {
          this.departments = data;
        } else {
          console.error('Received data is not an array:', data);
          this.error = 'Invalid data format received';
        }
        this.loading = false;
      },
      error: (err) => {
        const errorDetails =
          err.error?.message || err.message || 'Unknown error';
        console.error('Error loading departments:', err);
        this.error = `Failed to load departments: ${errorDetails}`;
        this.loading = false;
      },
      complete: () => {
        console.log('Department loading completed');
        this.loading = false;
      },
    });
  }

  deleteDepartment(id: number): void {
    if (!confirm('Are you sure you want to delete this department?')) {
      return;
    }

    console.log('Deleting department:', id);
    this.apiService.deleteDepartment(id).subscribe({
      next: () => {
        console.log('Department deleted successfully');
        this.departments = this.departments.filter((dept) => dept.id !== id);
      },
      error: (err) => {
        const errorDetails =
          err.error?.message || err.message || 'Unknown error';
        console.error('Error deleting department:', err);
        this.error = `Failed to delete department: ${errorDetails}`;
      },
    });
  }
}
