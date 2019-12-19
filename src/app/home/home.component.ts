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
  isAdmin: boolean = false
  code_current: string = '';
  code_relation: string = '';
  listaRespostas: Array<any> = []
  listDocuments: Array<any> = []

  constructor(
    private _formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
    private chatbotService: ChatbotService
  ) { }

  ngOnInit() {
    this.iniciarForm();
    this.listar();
    this.listarDocumentos();
  }

  iniciarForm() {
    this.chatbotForm = this._formBuilder.group({
      input: ['', [Validators.required]],
      output: ['', [Validators.required]],
    });
    if(this.authenticationService.currentUserValue.isAdmin === true) {
      this.isAdmin = this.authenticationService.currentUserValue.isAdmin
    }
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

  selecionar(item) {
    console.log(item.code_current)

    this.code_current = item.code_current

    this.chatbotForm = this._formBuilder.group({
      input: [`${item.input}`, [Validators.required]],
      output: [`${item.output}`, [Validators.required]],
    });
  }

  get f() { return this.chatbotForm.controls; }

  salvar() {
    console.log(this.authenticationService.currentUserValue)
    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    if (this.chatbotForm.invalid) {
      return;
    }

    

    if (this.code_current === '') {

      let objJSON = {
        "code_user": code_user,
        "activate": activate,
        "input": this.f.input.value,
        "output": this.f.output.value
      }

      this.chatbotService.insertData(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
      })
    }else {

      let objJSON = {
        "code_current": this.code_current,
        "code_user": code_user,
        "activate": activate,
        "input": this.f.input.value,
        "output": this.f.output.value
      }

      this.chatbotService.updateData(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
      })

      console.log('entrou no else')
    }
  }

  listarDocumentos() {
    console.log('entrou no listar()')
    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    let objJSON = {
      "code_user": code_user,
      "activate": activate
    }

    if(code_user !== 0) {
      this.chatbotService.findDocuments(objJSON).subscribe((data) => {  
        console.log(data)
        this.listDocuments = data
        console.log(this.listDocuments)
      })
    }

    
  }

  abrirChatbot() {
    window.open('http://localhost:4200/chatbot', '', 'width=410, height=450')
  }

  novo() {
    this.iniciarForm()
  }

  deletar() {

    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    if (this.chatbotForm.invalid) {
      return;
    }

    if (this.code_current !== '') {
      let objJSON = {
        "code_current": this.code_current,
        "code_user": code_user,
        "activate": activate,
        "input": this.f.input.value,
        "output": this.f.output.value
      }

      this.chatbotService.deleteData(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
        this.code_current = ''
        this.iniciarForm()
      })
    }

  }
}
