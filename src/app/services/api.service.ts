import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // เพิ่ม tap operator
import { Department } from '../models/department.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Department API calls
  getDepartments(): Observable<Department[]> {
    console.log('Fetching departments from:', `${this.apiUrl}/departments`);
    return this.http.get<Department[]>(`${this.apiUrl}/departments`).pipe(
      tap({
        next: (data) => console.log('Received departments:', data),
        error: (error) => console.error('Error fetching departments:', error)
      })
    );
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/departments/${id}`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/departments`, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/departments/${department.id}`, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/departments/${id}`);
  }

  // User API calls
  getUsers(): Observable<User[]> {
    console.log('Fetching users from:', `${this.apiUrl}/users`);
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap({
        next: (data) => console.log('API Response:', data),
        error: (error) => console.error('API Error:', error)
      })
    );
}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}