import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_API } from '../app.api';
import { Cliente } from '../shared/cliente.model';

@Injectable()
export class ChatbotService {

    constructor(private http: HttpClient) { }

    public findChatbot(objJSON: any): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/chatbot/find`, objJSON, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
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

    public updateData(objJSON: any): Observable<any> {
        console.log(objJSON)
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/chatbot/update`, objJSON, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
    }

}