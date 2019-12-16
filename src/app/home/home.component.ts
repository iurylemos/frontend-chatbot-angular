import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listarForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listarForm = this._formBuilder.group({
      code_user: ['', [Validators.required]],
      linhas: ['', [Validators.required]],
      code_relation: ['', [Validators.required]],
    });
    console.log(this.listarForm.value)
  }

  get f() { return this.listarForm.controls; }

  listar() {


    if (this.listarForm.invalid) {
      return;
    }

    console.log(this.f)


    this.authenticationService.findChatbot(this.f.code_user).subscribe((data) => {
      console.log(data)
      // this.customer.emit(data[0])
      this.router.navigate([''])
    }, (error) => {
      // this.alertService.error(error);
      console.log(error)
      // this.loading = false;
    })

    const code_user = Number(document.getElementById('code_user'));
    const linhas = document.getElementById('linhas');
    const code_relation = document.getElementById('code_relation');
  }

  listaTeste() {

  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['login'])
  }

  selecionar(_code_current = -1) {
    const http = new XMLHttpRequest();
	   			http.open('POST', '/chatbot/find', true);
    const code_current = document.getElementById('code_current');
	  const code_relation = document.getElementById('code_relation');
	  const input = document.getElementById('input');
	  const output = document.getElementById('output');
  }
}
