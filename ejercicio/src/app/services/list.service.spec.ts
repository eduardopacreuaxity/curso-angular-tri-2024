import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items', () => {
    fail();
  });

  it('should get items - error in service', () => {
    fail();
  });

  it('should add new item', () => {
    fail();
  });

  it('should add new item - error in service', () => {
    fail();
  });

  it('should update item', () => {
    fail();
  });

  it('should update item - error in service', () => {
    fail();
  });

  it('should delete item', () => {
    fail();
  });

  it('should delete item - error in service', () => {
    fail();
  });
});
