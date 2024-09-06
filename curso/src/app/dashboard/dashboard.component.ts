import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      input: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern(/\d/)])),
      select: new FormControl('', Validators.required),
      toggle: new FormControl(false, Validators.requiredTrue)
    });

    if (this.router.getCurrentNavigation()?.extras.state) {
      console.log('getCurrentNavigation: ', this.router.getCurrentNavigation()?.extras.state);
    }

    this.activeRoute.params.subscribe({
      next: (params) => console.log('params: ', params)
    });

    this.activeRoute.queryParams.subscribe({
      next: (params) => console.log('queryParams: ', params)
    });
  }

  goToHome() {
    const extras: NavigationExtras = {
      state: {
        id: 1,
        name: 'eduardo',
        card: '1234123412341234',
        bestweb: true
      }
    }
    this.router.navigate([''], extras);
  }

  showForm() {
    console.log('form: ', this.form.value)
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
