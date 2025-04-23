import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Department } from '../models/department.model';
import { User } from '../models/user.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Departments', () => {
    const mockDepartment: Department = { id: 1, name: 'HR' };

    it('should get all departments', () => {
      service.getDepartments().subscribe(departments => {
        expect(departments).toEqual([mockDepartment]);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/departments`);
      expect(req.request.method).toBe('GET');
      req.flush([mockDepartment]);
    });

    it('should get a single department', () => {
      service.getDepartment(1).subscribe(department => {
        expect(department).toEqual(mockDepartment);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/departments/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockDepartment);
    });

    it('should create a department', () => {
      service.createDepartment(mockDepartment).subscribe(department => {
        expect(department).toEqual(mockDepartment);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/departments`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockDepartment);
      req.flush(mockDepartment);
    });

    it('should update a department', () => {
      service.updateDepartment(mockDepartment).subscribe(department => {
        expect(department).toEqual(mockDepartment);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/departments/${mockDepartment.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockDepartment);
      req.flush(mockDepartment);
    });

    it('should delete a department', () => {
      service.deleteDepartment(1).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/departments/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Users', () => {
    const mockUser: User = {
      id: 1,
      fullName: 'John Doe',
      departmentId: 1,
      departmentName: 'HR'
    };

    it('should get all users', () => {
      service.getUsers().subscribe(users => {
        expect(users).toEqual([mockUser]);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users`);
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);
    });

    it('should get a single user', () => {
      service.getUser(1).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should create a user', () => {
      service.createUser(mockUser).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockUser);
    });

    it('should update a user', () => {
      service.updateUser(mockUser).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users/${mockUser.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockUser);
    });

    it('should delete a user', () => {
      service.deleteUser(1).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/users/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});