import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  form: FormGroup;
  list: any[] = [];

  constructor(
    private fb: FormBuilder,
    private listService: ListService
  ) {
    this.form = this.fb.group({
      title: '',
      price: ''
    });

    this.getItems();
  }
  errorMessage(control: string) {
    return '';
  }
  getItems() {
    this.listService.getItems().subscribe({
      next: (response) => {
        this.list = response;
      }
    });
  }
  addNewItem() {
    const body = {
      title: this.form.controls['title'].value,
      price: this.form.controls['price'].value
    }
    this.listService.addItems(body).subscribe({
      next: (response) => {
        this.list.push(response);
      }
    });
  }
  updateItem(item: any) {
    const body = {
      title: item.title,
      price: item.price
    }
    this.listService.updateItems(item.id, body).subscribe({
      next: (response) => {}
    });
  }
  deleteItem(id: number) {
    this.listService.deleteItems(id).subscribe({
      next: () => {
        this.getItems()
      }
    });
  }
}
