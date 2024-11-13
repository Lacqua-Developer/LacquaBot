import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ContatoService } from '../contato.service';
import { Contato } from '../contato';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-contato-edit',
  templateUrl: './contato-edit.component.html'
})
export class ContatoEditComponent implements OnInit {

  id: string;
  contato: Contato;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Contato()); }
          return this.contatoService.findById(id);
        })
      )
      .subscribe(contato => {
          this.contato = contato;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.contatoService.save(this.contato).subscribe(
      contato => {
        this.contato = contato;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/contatoes']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/contatoes']);
  }
}
