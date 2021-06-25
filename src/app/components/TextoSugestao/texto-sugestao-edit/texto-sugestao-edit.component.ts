import { ConfigService } from './../../../../service/config.service';
import { Config } from 'src/app/models/config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TextoSugestaoService } from '../texto-sugestao.service';
import { TextoSugestao } from '../texto-sugestao';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-texto-sugestao-edit',
  templateUrl: './texto-sugestao-edit.component.html',
  styleUrls: ['./texto-sugestao-edit.component.scss']
})
export class TextoSugestaoEditComponent implements OnInit {

  id: string;
  textoSugestao: TextoSugestao;
  feedback: any = {};
  public chips: Config[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private textoSugestaoService: TextoSugestaoService,
    private c: ConfigService) {
      this.c.RetConfig.subscribe(cc => this.chips = cc);
      console.log('Chips:', this.chips);
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new TextoSugestao()); }
          return this.textoSugestaoService.findById(id);
        })
      )
      .subscribe(textoSugestao => {
          this.textoSugestao = textoSugestao;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.textoSugestaoService.save(this.textoSugestao).subscribe(
      textoSugestao => {
        this.textoSugestao = textoSugestao;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/textoSugestaos']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/textoSugestaos']);
  }
}
