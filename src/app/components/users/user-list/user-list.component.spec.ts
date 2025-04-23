import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { ApiService } from '../../../services/api.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockUsers = [
    { id: 1, fullName: 'John Doe', departmentId: 1, departmentName: 'HR' },
    { id: 2, fullName: 'Jane Smith', departmentId: 2, departmentName: 'IT' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getUsers', 'deleteUser']);
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ UserListComponent ],
      providers: [
        { provide: ApiService, useValue: spy }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    apiService.getUsers.and.returnValue(of(mockUsers));
    
    fixture.detectChanges();
    
    expect(component.users).toEqual(mockUsers);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  });

  it('should handle error when loading users', () => {
    apiService.getUsers.and.returnValue(throwError(() => new Error('Network error')));
    
    fixture.detectChanges();
    
    expect(component.users).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Failed to load users. Please try again later.');
  });

  it('should delete user when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    apiService.deleteUser.and.returnValue(of(void 0));
    component.users = [...mockUsers];

    component.deleteUser(1);

    expect(apiService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.users.length).toBe(1);
    expect(component.users[0].id).toBe(2);
  });

  it('should not delete user when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.users = [...mockUsers];

    component.deleteUser(1);

    expect(apiService.deleteUser).not.toHaveBeenCalled();
    expect(component.users.length).toBe(2);
  });
});