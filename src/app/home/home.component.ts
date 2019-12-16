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
  listaRespostas: Array<any> = []

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
    private chatbotService: ChatbotService
  ) { }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
  }

  iniciarForm() {
    this.chatbotForm = this._formBuilder.group({
      input: ['', [Validators.required]],
      output: ['', [Validators.required]],
    });
    console.log(this.chatbotForm.value)
    console.log(this.authenticationService.currentUserValue)
  }

  listar() {
    console.log('entrou no listar()')
    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    let objJSON = {
      "code_user": code_user,
      "activate": activate
    }

    if(code_user !== 0) {
      this.chatbotService.findChatbot(objJSON).subscribe((data) => {
        console.log(data)
        this.listaRespostas = data
      })
    }

    
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['login'])
  }

  selecionar(_code_current = -1) {
    console.log(_code_current)
    const activate = this.authenticationService.currentUserValue.activate
    let objJSON = {
      "code_current": _code_current,
      "activate": activate
    }
    this.chatbotService.findChatbot(objJSON).subscribe((data) => {
      console.log(data)
      this.listaRespostas = data
    })
  }

  get f() { return this.chatbotForm.controls; }

  salvar() {
    console.log(this.authenticationService.currentUserValue)
    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    if (this.chatbotForm.invalid) {
      return;
    }

    let objJSON = {
      "code_user": code_user,
      "activate": activate,
      "input": this.f.input.value,
      "output": this.f.output.value
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

  listarDocumentos() {

  }

  novo() {
    this.iniciarForm()
  }
}
