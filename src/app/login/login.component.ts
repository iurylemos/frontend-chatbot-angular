import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarioinvalido: boolean = false
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      user_name: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    console.log(this.loginForm.value)
  }

  get f() { return this.loginForm.controls; }


  entrar() {


    if (this.loginForm.invalid) {
      this.usuarioinvalido = true
      return;
    }

    console.log(this.loginForm)
    console.log(this.f)

    this.authenticationService.login(this.f.user_name.value, this.f.password.value).subscribe((data) => {
      console.log(data)
      if(data !== null) {
        this.router.navigate([''])
      }else {
        this.usuarioinvalido = true
        setTimeout(() => {
          this.usuarioinvalido = false
        }, 3000);
      }
    }, (error) => {
      console.log(error)
    })
  }
}
