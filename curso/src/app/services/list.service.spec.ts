import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListResponseI } from '../constants/list.interfaces';

fdescribe('ListService', () => {
  let service: ListService;
  let httpTestingController: HttpTestingController;
  const MockListItemsResponse: ListResponseI[] = [
    {
      "id": "1",
      "title": "a title",
      "views": 100
    },
    {
      "id": "2",
      "title": "another title",
      "views": 200
    },
    {
      "id": "b532",
      "title": "poko",
      "views": 123
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get items', () => {
    service.getListItems().subscribe({
      next: (response) => expect(response).toEqual(MockListItemsResponse),
      error: () => fail('Fallo por entrar en error')
    });

    const req = httpTestingController.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toEqual('GET');

    req.flush(MockListItemsResponse);
  });

  it('should get items - error in service', () => {
    const emsg = 'TEST ERROR';
    service.getListItems().subscribe({
      next: () => fail('Fallo por entrar en next'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe('TEST ERROR');
      }
    });

    const req = httpTestingController.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toEqual('GET');

    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });
});
