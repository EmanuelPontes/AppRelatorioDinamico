import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators';
import  { Atributo } from '../../models/Atributo';

@Injectable({
  providedIn: 'root'
})
export class CadastroAtributosService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  public postAtributo(atributo: Atributo)  {
    return this.http.post(`${this.API_URL}/rel/attrbts`, atributo).pipe(retry(1));
  }

  public getAtributos() {
    return this.http.get<Array<Atributo>>(`${this.API_URL}/rel/attrbts`).pipe(retry(1));
  }

  public deleteAtributo(id: Number) {
    return this.http.delete(`${this.API_URL}/rel/attrbts/${id}`).pipe(retry(1));
  }
}
