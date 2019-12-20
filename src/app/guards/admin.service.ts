import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_API } from '../app.api';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminService {

    constructor(private http: HttpClient){}

    public findUsers(): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/user/find`, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
    }

    public insertUser(objJSON: any): Observable<any> {
        console.log(objJSON)
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/user/insert`, objJSON, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
    }

    public updateUser(objJSON: any): Observable<any> {
        console.log(objJSON)
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/user/update`, objJSON, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
    }

    public deleteUser(objJSON: any): Observable<any> {
        console.log(objJSON)
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${URL_API}/user/delete`, objJSON, { headers: headers }).pipe(
            map((resposta: any) => {
                return resposta
            })
        );
    }
}