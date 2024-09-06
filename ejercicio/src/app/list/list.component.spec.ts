import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ListService } from '../services/list.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listServiceSpy: jasmine.SpyObj<ListService>;
  let MockListResponse = [
    {
      "id": "1",
      "title": "The code",
      "price": "125"
    },
    {
      "id": "2",
      "title": "The code",
      "price": "125"
    }
  ]

  beforeEach(async () => {
    listServiceSpy = jasmine.createSpyObj<ListService>('ListService', ['getItems']);
    listServiceSpy.getItems.and.returnValues(of(MockListResponse))

    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
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

  it('should validate form for new item', () => {
    fail();
  });

  it('should invalidate form for new item', () => {
    fail();
  });
});
