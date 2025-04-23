import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentFormComponent } from './department-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DepartmentFormComponent', () => {
  let component: DepartmentFormComponent;
  let fixture: ComponentFixture<DepartmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentFormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});