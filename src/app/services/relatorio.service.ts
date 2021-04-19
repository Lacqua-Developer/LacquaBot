import { Relatorio } from '../models/relatorio';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  public CreateRelatorio(r: Relatorio): Observable<Relatorio> {
    return this.http.post<Relatorio>(environment.api + 'relatorio/set', r);
  }

  public EditaRelatorio(r: Relatorio): Observable<Relatorio> {
    return this.http.post<Relatorio>(environment.api + 'relatorio/set', r);
  }

  public ListaRelatorio(permissao: number): Observable<Relatorio[]> {
    return this.http.get<Relatorio[]>(environment.api + 'relatorio/get/' + permissao );
  }

  public DesativaRelatorio(id: number): Observable<any>{
    return this.http.get(environment.api + 'relatorio/desativa/' + id );
  }

  public GeraResultRelatorio(id: number): Observable<any[]>{
    return this.http.get<any[]>(environment.api + 'relatorio/ResultRelatorio/' + id );

  }
}
