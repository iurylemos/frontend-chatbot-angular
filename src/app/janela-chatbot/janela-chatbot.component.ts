import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatbotService } from '../guards/chatbot.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-janela-chatbot',
  templateUrl: './janela-chatbot.component.html',
  styleUrls: ['./janela-chatbot.component.scss']
})
export class JanelaChatbotComponent implements OnInit {

  conversaForm: FormGroup;
  perguntaUser: string = ''
  code_ultima: number = 0
  code_relation: number = 0
  perguntasChatbot: Array<any> = []
  respostaChatbot: Array<any> = []
  arrayUltima: Array<any> = []

  constructor(
    private _formBuilder: FormBuilder,
    public chatbotService: ChatbotService,
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
    this.iniciarForm()
  }

  iniciarForm() {
    this.conversaForm = this._formBuilder.group({
      input: ['', [Validators.required]]
    });
  }

  send(event) {
    // console.log(event)
    if (event.keyCode == 13) {
      this.perguntar()
      return false
    }
  }

  get f() { return this.conversaForm.controls; }

  perguntar() {
    const code_user = this.authenticationService.currentUserValue.code_user

    if (this.conversaForm.invalid) {
      return;
    }

    this.chatbotService.conversarChatbot(code_user, this.f.input.value).then((resposta) => {
      console.log('RESPOSTA', resposta)

      console.log()


      const ultimaPosicao = this.respostaChatbot.slice(-1)
      if (ultimaPosicao !== undefined) {
        console.log('ULTIMA POSIÇÃO DO ARRAY', ultimaPosicao)

        //Pecorrendo a resposta

        for (let index = 0; index < resposta.length; index++) {
          const element = resposta[index];

          this.code_relation = element.code_relation
          
        }

        if(this.code_relation > 0) {

          for (let index = 0; index < ultimaPosicao.length; index++) {
            this.arrayUltima = ultimaPosicao[index];
          }
  
          for (let index = 0; index < this.arrayUltima.length; index++) {
            const element = this.arrayUltima[index];
            this.code_ultima = element.code_current
  
            console.log(this.code_ultima)
          }

          const filter = resposta.filter(filter => filter.code_relation === this.code_ultima)
          console.log(filter)

          if(filter.length) {
            this.respostaChatbot.push(resposta)
            this.iniciarForm()
            this.scrollToBottom();
          }else {

            this.perguntaUser = this.f.input.value

            this.chatbotService.conversarChatbot(code_user, "respostaqualquer").then((resposta) => {
              
              this.respostaChatbot.push(resposta)
              this.iniciarForm()
              this.scrollToBottom();
            })

          }

        }else {
          this.respostaChatbot.push(resposta)
          this.iniciarForm()
          this.scrollToBottom();
        }
      }

    })

  }

  scrollToBottom(): void {
    setTimeout(() => {
      const conent = document.querySelector('#msg');
      console.log(conent)
      conent.scrollTop = conent.scrollHeight
    }, 100);
  }

}
