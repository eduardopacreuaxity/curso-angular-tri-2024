import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListBodyI, ListResponseI } from '../constants/list.interfaces';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {

  form: FormGroup;
  list: ListResponseI[] = [];
  listUnsubscribe?: Subscription;

  constructor(
    private fb: FormBuilder,
    private listService: ListService
  ) {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      views: new FormControl('', Validators.required),
    });

    this.getListItems();
  }

  ngOnDestroy() {
    this.listUnsub();
  }

  getListItems() {
    this.listUnsub();
    this.listService.getListItems().subscribe({
      next: (response) => {
        this.list = response;
      },
      error: (error) => console.error(error)
    });
  }

  addNewItem() {
    this.listUnsub();
    const body: ListBodyI = {
      title: this.form.controls['title'].value,
      views: parseInt(this.form.controls['views'].value)
    };
    this.listService.addNewItem(body).subscribe({
      next: (response) => {
        this.list.push(response);
      },
      error: (error) => console.error(error)
    });
  }

  updateItem(item: ListResponseI) {
    this.listUnsub();
    const body: ListBodyI = {
      title: item.title,
      views: item.views
    };
    this.listService.updateItem(item.id, body).subscribe({
      next: (response) => {
        //this.getListItems();
        /*this.list = this.list.map((value, index, array) => {
          if (value.id === response.id) {
            value = response;
          }
          return value;
        });*/
        /*const index = this.list.findIndex((value) => value.id === response.id);
        if (index >= 0) {
          this.list[index] = response;
        }*/
      },
      error: (error) => console.error(error)
    });
  }
  deleteItem(id: string) {
    this.listUnsub();
    this.listService.deleteItem(id).subscribe({
      next: (response) => {
        this.getListItems();
      },
      error: (error) => console.error(error)
    });
  }

  listUnsub() {
    if (this.listUnsubscribe) {
      this.listUnsubscribe.unsubscribe();
    }
  }

  errorMessage(control: string): string {
    if (this.form.controls[control]?.hasError('required')) {
      return 'El campo es requerido';
    }
    if (this.form.controls[control]?.hasError('email')) {
      return 'El campo tiene que ser un correo valido';
    }
    if (this.form.controls[control]?.hasError('pattern')) {
      return 'El campo debe tener al menos un número';
    }
    return '';
  }

}
