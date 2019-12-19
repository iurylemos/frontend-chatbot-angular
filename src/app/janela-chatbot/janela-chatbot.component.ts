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
  perguntasChatbot: Array<any> = []
  respostaChatbot: Array<any> = []

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
    console.log(event)
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
      console.log(resposta)
      this.respostaChatbot.push(resposta)
      this.iniciarForm()
      this.scrollToBottom();
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
