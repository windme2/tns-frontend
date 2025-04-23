import { Routes } from '@angular/router';

import { DepartmentListComponent } from './components/departments/department-list/department-list.component';
import { DepartmentFormComponent } from './components/departments/department-form/department-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/new', component: DepartmentFormComponent },
  { path: 'departments/:id', component: DepartmentFormComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserFormComponent }
];