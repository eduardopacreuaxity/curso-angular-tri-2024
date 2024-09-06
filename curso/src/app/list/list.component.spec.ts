import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { ListResponseI } from '../constants/list.interfaces';
import { ListService } from '../services/list.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;
  let MockListItemsResponse: ListResponseI[];

  beforeEach(async () => {
    MockListItemsResponse = [
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

    listServiceSpy = jasmine.createSpyObj<ListService>('ListService', ['getListItems']);
    listServiceSpy.getListItems.and.callFake(() => new Observable(observer => {
      observer.next(MockListItemsResponse);
      observer.complete();
    }));
    //listServiceSpy.getListItems.and.returnValue(of(MockListItemsResponse));

    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ListService, useValue: listServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items', () => {
    component.list = [];
    component.getListItems();
    expect(component.list.length).toBe(3);
    expect(component.list.length).toBeGreaterThan(0);
    expect(component.list).toEqual(MockListItemsResponse);
  });

  it('should get items - error in service', () => {
    listServiceSpy.getListItems.and.returnValue(throwError(() => new HttpErrorResponse({ error: 'TEST ERROR', status: 404 })));
    spyOn(console, 'error').and.callThrough();
    component.list = [];
    component.getListItems();
    expect(component.list.length).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });
});
