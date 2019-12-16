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
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      user_name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    console.log(this.loginForm.value)
  }

  get f() { return this.loginForm.controls; }


  entrar() {


    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm)
    console.log(this.f)

    this.authenticationService.login(this.f.user_name.value, this.f.password.value).subscribe((data) => {
      console.log(data)
      // this.customer.emit(data[0])
      this.router.navigate([''])
    }, (error) => {
      // this.alertService.error(error);
      console.log(error)
      // this.loading = false;
    })


    // 	const user_name = document.getElementById('user_name').value.toString().trim();
    // 	const password = document.getElementById('password').value.toString().trim();

    // 	const http = new XMLHttpRequest();
    // 	http.open('POST', '/user/search', true);
    // 	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // 	http.onreadystatechange = function() {
    // 		if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    // 			let objJSON = JSON.parse(http.responseText);
    // 			if((objJSON.user_name==user_name)&&(objJSON.password==password)) {
    // 				localStorage.setItem('objJSON', JSON.stringify(objJSON));
    // 				window.location.href = `/index?user_name=${user_name}&password=${password}`;
    // 			}else {
    // 				window.location.href = '/login';
    // 			}
    // 		}
    // 	}
    // 	http.send(`user_name=${user_name}&password=${password}`);
    // }
  }
}
