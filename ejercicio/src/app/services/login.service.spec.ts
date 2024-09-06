import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController
  let MockUsersResponse = [
    {
      "id": "1",
      "user": "eduardo.pacreu@axity.com",
      "password": "qweASD123"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate login', () => {
    service.validateLogin('test@test.com', 'qweASD123').subscribe({
      next: (response) => expect(response).toEqual(MockUsersResponse),
      error: () => fail('Fallo por entrar en error')
    });

    const url = 'http://localhost:3000/users?user=test@test.com&password=qweASD123';

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');

    req.flush(MockUsersResponse);
  });

  it('should validate login - error in service', () => {
    service.validateLogin('test@test.com', 'qweASD123').subscribe({
      next: () => fail('Fallo por entrar en next'),
      error: (error) => expect(error).toEqual(new HttpErrorResponse({}))
    });

    const url = 'http://localhost:3000/users?user=test@test.com&password=qweASD123';

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });
});
