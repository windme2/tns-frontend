import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DepartmentListComponent } from './department-list.component';
import { ApiService } from '../../../services/api.service';

describe('DepartmentListComponent', () => {
  let component: DepartmentListComponent;
  let fixture: ComponentFixture<DepartmentListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockDepartments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getDepartments', 'deleteDepartment']);
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DepartmentListComponent ],
      providers: [
        { provide: ApiService, useValue: spy }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load departments on init', () => {
    apiService.getDepartments.and.returnValue(of(mockDepartments));
    
    fixture.detectChanges();
    
    expect(component.departments).toEqual(mockDepartments);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  });

  it('should handle error when loading departments', () => {
    apiService.getDepartments.and.returnValue(throwError(() => new Error('Network error')));
    
    fixture.detectChanges();
    
    expect(component.departments).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Failed to load departments. Please try again later.');
  });

  it('should delete department when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    apiService.deleteDepartment.and.returnValue(of(void 0));
    component.departments = [...mockDepartments];

    component.deleteDepartment(1);

    expect(apiService.deleteDepartment).toHaveBeenCalledWith(1);
    expect(component.departments.length).toBe(1);
    expect(component.departments[0].id).toBe(2);
  });

  it('should not delete department when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.departments = [...mockDepartments];

    component.deleteDepartment(1);

    expect(apiService.deleteDepartment).not.toHaveBeenCalled();
    expect(component.departments.length).toBe(2);
  });
});