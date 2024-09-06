import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) {}

  getItems() {
    return this.http.get<any>('http://localhost:3000/libros')
  }

  addItems(item: any) {
    return this.http.post<any>('http://localhost:3000/libros', item)
  }

  updateItems(id: number, item: any) {
    return this.http.put<any>('http://localhost:3000/libros/' + id, item)
  }

  deleteItems(id: number) {
    return this.http.delete<any>('http://localhost:3000/libros/' + id)
  }
}
