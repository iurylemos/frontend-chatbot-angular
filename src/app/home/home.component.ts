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

  innerText: string = ''
  chatbotForm: FormGroup;
  isAdmin: boolean = false
  code_current: number = 0;
  code_relation: number= 0;
  listaRespostas: Array<any> = []
  listDocuments: Array<any> = []
  listSubDocuments: Array<any> = []

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

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          console.log('ELEMENT',element)

          if(element.code_relation > 0) {
            this.listSubDocuments.push(element)
          }else {
            this.listaRespostas.push(element)
          }
        }

        console.log('LISTA RESPOSTA',this.listaRespostas)
        console.log('SUB RESPOSTA', this.listSubDocuments)

      })
    }

    
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['login'])
  }

  selecionar(item) {
    console.log(item)

    if(item.code_relation > 0) {
      this.code_relation = item.code_relation
    }

    this.code_current = item.code_current

    this.chatbotForm = this._formBuilder.group({
      input: [`${item.input}`, [Validators.required]],
      output: [`${item.output}`, [Validators.required]],
    });
  }

  get f() { return this.chatbotForm.controls; }

  
  relacionando(event) {
    console.log(event.target.value)
    if(event.target.value) {
      let list = this.listaRespostas.filter(d => d.input === event.target.value)
      console.log(list)

      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        this.code_relation = element.code_current
      }

      console.log(this.code_relation)
    }
  }

  salvar() {
    console.log(this.authenticationService.currentUserValue)
    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    if (this.chatbotForm.invalid) {
      return;
    }

    console.log('CODE_RELATION',this.code_relation)

    

    if (this.code_current === 0) {

      let objJSON = {}

      if(this.code_relation !== 0) {
        objJSON = {
          "code_relation": this.code_relation,
          "code_user": code_user,
          "activate": activate,
          "input": this.f.input.value,
          "output": this.f.output.value
        }
      }else {
        objJSON = {        
          "code_user": code_user,
          "activate": activate,
          "input": this.f.input.value,
          "output": this.f.output.value
        }
      }

      this.chatbotService.insertData(objJSON).subscribe((resposta) => {
        console.log(resposta)
        this.listar()
      })
    }else {

      let objJSON = {}

      if(this.code_relation !== 0) {
        objJSON = {
          "code_relation": this.code_relation,
          "code_current": this.code_current,
          "code_user": code_user,
          "activate": activate,
          "input": this.f.input.value,
          "output": this.f.output.value
        }
      }else {
        objJSON = {
          "code_current": this.code_current,
          "code_user": code_user,
          "activate": activate,
          "input": this.f.input.value,
          "output": this.f.output.value
        }
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
    this.code_relation = 0
    this.code_current = 0
    this.iniciarForm()
  }

  deletar() {

    const code_user = this.authenticationService.currentUserValue.code_user
    const activate = this.authenticationService.currentUserValue.activate

    if (this.chatbotForm.invalid) {
      return;
    }

    if (this.code_current !== 0) {
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
        this.code_current = 0
        this.iniciarForm()
      })
    }

  }

  setIncorporacao() {

    this.innerText = 
    `
		         <a href="#"
		         onclick="window.open('http://localhost:3000/chatbot?code_user=[code_user]', 
		         					  '',
		         					  'width=410,height=450')">
		         	Chatbot
		     	 </a>
	  `;
  }
}
