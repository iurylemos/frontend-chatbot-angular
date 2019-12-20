import { Component, OnInit } from '@angular/core';
import { AdminService } from '../guards/admin.service';
import { AuthService } from '../guards/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-admin',
  templateUrl: './area-admin.component.html',
  styleUrls: ['./area-admin.component.scss']
})
export class AreaAdminComponent implements OnInit {

  adminForm: FormGroup;
  arrayUser : Array<any> = []
  code_current: string = '';
  code_relation: string = '';
  code_user: number = 0
  activate: boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    public adminService: AdminService,
    private authenticationService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.iniciarForm()
    this.listar()
  }

  iniciarForm() {
    this.adminForm = this._formBuilder.group({
      full_name: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      activate: ['', [Validators.required]],
    });
    console.log(this.adminForm.value)
    console.log(this.authenticationService.currentUserValue)
  }

  listar() {

    // const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    let objJSON = {
      "activate": activate
    }

    this.adminService.findUsers().subscribe((resp) => {
      console.log(resp)
      this.arrayUser = resp
    })
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['login'])
  }

  get f() { return this.adminForm.controls; }

  novo() {
    this.iniciarForm()
  }

  selecionar(item) {
    console.log(item)

    this.code_user = item.code_user

    if(item.activate > 0) {
      this.activate = true
    }else {
      this.activate = false
    }

    

    this.adminForm = this._formBuilder.group({
      full_name: [`${item.full_name}`, [Validators.required]],
      user_name: [`${item.user_name}`, [Validators.required]],
      email: [`${item.email}`, [Validators.required]],
      password: [`${item.password}`, [Validators.required]],
      activate: [`${this.activate}`],
    });
  }

  salvar() {
    console.log(this.authenticationService.currentUserValue)
    // const code_user = this.authenticationService.currentUserValue.code_user
    // const activate = this.authenticationService.currentUserValue.activate

    if (this.adminForm.invalid) {
      return;
    }

    console.log(this.f.activate.value)
    console.log(this.code_user)

    

    if (this.code_user === 0) {

      let objJSON = {
        "code_user": this.code_user,
        "activate": this.f.activate.value,
        "full_name": this.f.full_name.value,
        "user_name": this.f.user_name.value,
        "email": this.f.email.value,
        "password": this.f.password.value
      }

      this.adminService.insertUser(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
      })
    }else {

      let objJSON = {
        "code_user": this.code_user,
        "activate": this.f.activate.value,
        "full_name": this.f.full_name.value,
        "user_name": this.f.user_name.value,
        "email": this.f.email.value,
        "password": this.f.password.value
      }

      this.adminService.updateUser(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
      })

      console.log('entrou no else')
    }
  }

}
