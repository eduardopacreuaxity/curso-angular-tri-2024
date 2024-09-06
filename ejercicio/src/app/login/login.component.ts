import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.form.valid) {
      const user = this.form.controls['email'].value;
      const password = this.form.controls['password'].value;
      this.loginService.validateLogin(user, password).subscribe({
        next: (response) => { this.router.navigate(['items']) },
        error: (error) => { console.error(error) }
      })
    }
  }

}
