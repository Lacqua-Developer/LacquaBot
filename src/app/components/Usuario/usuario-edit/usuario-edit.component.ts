import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html'
})
export class UsuarioEditComponent implements OnInit {

  id: string;
  usuario: Usuario;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Usuario()); }
          return this.usuarioService.findById(id);
        })
      )
      .subscribe(usuario => {
          this.usuario = usuario;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.usuarioService.save(this.usuario).subscribe(
      usuario => {
        this.usuario = usuario;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/usuarios']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/usuarios']);
  }
}
