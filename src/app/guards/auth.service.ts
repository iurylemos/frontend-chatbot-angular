import { Cliente } from '../shared/cliente.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../app.api';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<Cliente>;
  public currentUser: Observable<Cliente>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Cliente>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Cliente {
    this.currentUserSubject.subscribe((data) => {
      console.log('DADOS: ', data)
    })
    // console.log(this.currentUserSubject.next)
    // console.log(this.currentUserSubject.getValue())
    // console.log(this.currentUserSubject.value)


    return this.currentUserSubject.value;
  }

  public login(user_name: any, password: any): Observable<any> {
    console.log('entrou aqui no LOGIN do AUTH SERVICE')
    let objJSON = {
      "user_name": user_name,
      "password": password
    }

    console.log(objJSON)
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Headers: Content-Type");
    let headers = new HttpHeaders({'Content-Type':'application/json'}); 
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});  

    return this.http.post(`${URL_API}/user/search`, objJSON, { headers: headers }).pipe(
      map((resposta: any) => {
        if(resposta !== null) {
          localStorage.setItem('currentUser', JSON.stringify(resposta));
          this.currentUserSubject.next(resposta);
        }
        return resposta
      })
    );
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear()
    // this.currentUserSubject = new BehaviorSubject<Cliente>(null);
    this.currentUserSubject.next(null);
  }

  public register(cliente: FormBuilder): Observable<any> {
    console.log('entrou', cliente)
    // console.log(pedido)
    //Post é um observable de uma resposta
    //O conteudo que vou enviar é o pedido
    //E vou enviar pelo body 
    //Com o stringify que pega esse objeto literal
    //E retrona uma string que o representa.
    //E por fim, preciso setar no request
    //As opções da nossa requisição;
    //Mais especificamente os headers da minha requisição

    return this.http.post(`${URL_API}/registrarCliente`, cliente).pipe(
      map((resposta: any) => resposta)
    );
  }


  public loginAdmin(cliente: FormBuilder): Observable<any> {
    console.log('entrou', cliente)
    //console.log(pedido)
    //Post é um observable de uma resposta
    //O conteudo que vou enviar é o pedido
    //E vou enviar pelo body 
    //Com o stringify que pega esse objeto literal
    //E retrona uma string que o representa.
    //E por fim, preciso setar no request
    //As opções da nossa requisição;
    //Mais especificamente os headers da minha requisição

    return this.http.post(`${URL_API}/admin/search`, cliente).pipe(
      map((resposta: any) => resposta)
    );
  }


}
