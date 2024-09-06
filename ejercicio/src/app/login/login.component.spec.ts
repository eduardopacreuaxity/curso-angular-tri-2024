import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../services/login.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ListComponent } from '../list/list.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let router: Router;
  let MockUsersResponse = [
    {
      "id": "1",
      "user": "eduardo.pacreu@axity.com",
      "password": "qweASD123"
    }
  ]

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', ['validateLogin']);
    loginServiceSpy.validateLogin.and.returnValue(of(MockUsersResponse));

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'items', component: ListComponent
        }]),
        HttpClientTestingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate login', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['email'].updateValueAndValidity();
    component.form.controls['password'].setValue('qweASD123');
    component.form.controls['password'].updateValueAndValidity();
    component.login();
    expect(loginServiceSpy.validateLogin).toHaveBeenCalledWith('test@test.com', 'qweASD123');
    expect(router.navigate).toHaveBeenCalledWith(['items']);
  });

  it('should invalidate login', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.login();
    expect(loginServiceSpy.validateLogin).not.toHaveBeenCalledWith('test@test.com', 'qweASD123');
    expect(router.navigate).not.toHaveBeenCalledWith(['items']);
  });

  it('should validate login - error in service', () => {
    loginServiceSpy.validateLogin.and.returnValue(throwError(() => new HttpErrorResponse({})));
    spyOn(router, 'navigate').and.callThrough();
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['email'].updateValueAndValidity();
    component.form.controls['password'].setValue('qweASD123');
    component.form.controls['password'].updateValueAndValidity();
    component.login();
    expect(loginServiceSpy.validateLogin).toHaveBeenCalledWith('test@test.com', 'qweASD123');
    expect(router.navigate).not.toHaveBeenCalledWith(['items']);
  });

  it('should validate email form', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['email'].updateValueAndValidity();
    expect(component.form.controls['email'].valid).toBeTrue();
  });

  it('should validate email form - error requiered', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['email'].updateValueAndValidity();
    expect(component.form.controls['email'].valid).toBeFalse();
  });

  it('should validate email form - error email', () => {
    component.form.controls['email'].setValue('test');
    component.form.controls['email'].updateValueAndValidity();
    expect(component.form.controls['email'].valid).toBeFalse();
  });

  it('should validate password form', () => {
    component.form.controls['password'].setValue('qweASD123');
    component.form.controls['password'].updateValueAndValidity();
    expect(component.form.controls['password'].valid).toBeTrue();
  });

  it('should validate password form - error requiered', () => {
    component.form.controls['password'].setValue('');
    component.form.controls['password'].updateValueAndValidity();
    expect(component.form.controls['password'].valid).toBeFalse();
  });
});
