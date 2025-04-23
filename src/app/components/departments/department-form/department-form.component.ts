import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  department: Department = {
    id: 0,
    name: ''
  };
  
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEdit = true;
      this.loadDepartment(+id);
    }
  }
  
  loadDepartment(id: number): void {
    this.loading = true;
    this.apiService.getDepartment(id).subscribe({
      next: (data) => {
        this.department = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load department. Please try again later.';
        console.error('Error loading department:', err);
        this.loading = false;
      }
    });
  }
  
  saveDepartment(): void {
    this.saving = true;
    this.error = '';
    
    const save$ = this.isEdit 
      ? this.apiService.updateDepartment(this.department)
      : this.apiService.createDepartment(this.department);
      
    save$.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/departments']);
      },
      error: (err) => {
        this.error = `Failed to ${this.isEdit ? 'update' : 'create'} department. Please try again later.`;
        console.error(`Error ${this.isEdit ? 'updating' : 'creating'} department:`, err);
        this.saving = false;
      }
    });
  }
}