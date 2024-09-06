import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListBodyI, ListResponseI } from '../constants/list.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }

  getListItems() {
    return this.http.get<ListResponseI[]>('http://localhost:3000/posts');
  }

  addNewItem(body: ListBodyI) {
    return this.http.post<ListResponseI>('http://localhost:3000/posts', body);
  }

  updateItem(id: string, body: ListBodyI) {
    return this.http.put<ListResponseI>('http://localhost:3000/posts/' + id, body);
  }

  deleteItem(id: string) {
    return this.http.delete<ListResponseI[]>('http://localhost:3000/posts/' + id);
  }
}
