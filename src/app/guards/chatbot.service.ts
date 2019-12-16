import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_API } from '../app.api';
import { Cliente } from '../shared/cliente.model';

@Injectable()
export class ChatbotService {

    constructor(private http: HttpClient) { }

    public findChatbot(find: any): Observable<any> {
        // 'Content-Type', 'application/x-www-form-urlencoded'
        // console.log(email)  
        // console.log(`${URL_API}/cliente?email=${email}&password=${password}`)
        return this.http.get<Cliente>(`${URL_API}/chatbot/find`)
            .pipe(map(user => {
                return user;
            }));
    }

    public insertData(objJSON: any): Observable<any> {
        console.log(objJSON)
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/chatbot/insert`, objJSON, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
    }

}