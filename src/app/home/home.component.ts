import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatbotService } from '../guards/chatbot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chatbotForm: FormGroup;
  code_current: string = '';
  code_relation: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
    private chatbotService: ChatbotService
  ) { }

  ngOnInit() {
    this.chatbotForm = this._formBuilder.group({
      input: ['', [Validators.required]],
      output: ['', [Validators.required]],
    });
    console.log(this.chatbotForm.value)
    console.log(this.authenticationService.currentUserValue)
  }

  listar() {
    console.log('entrou no listar()')
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

  get f() { return this.chatbotForm.controls; }

  salvar() {
    console.log(this.authenticationService.currentUserValue)
    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    if (this.chatbotForm.invalid) {
      return;
    }

    let params = '';
    if (code_user > 0) params += `code_user=${code_user}&`;
    if (this.code_current !== '') params += `code_current=${this.code_current}&`;
    if (this.code_relation !== '') params += `code_relation=${this.code_relation}&`;
    if (this.f.input.value) params += `input=${this.f.input.value}&`;
    if (this.f.output.value) params += `output=${this.f.output.value}&`;
    // if (activate) params += `output=${this.f.output}&`;
    params += '#';
    params = params.replace('&#', '');
    console.log('params',params)

    let objJSON = {
      "code_user": code_user,
      "input": this.f.output.value,
      "output": this.f.input.value
    }

    if (this.code_current === '') {
      this.chatbotService.insertData(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
      })
    }else {
      console.log('entrou no else')
    }
  }
}
