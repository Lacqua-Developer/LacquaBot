import { Component, OnInit } from '@angular/core';
import { UsuarioFilter } from '../usuario-filter';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario-list.component.html',
  styleUrls: ['usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  filter = new UsuarioFilter();
  selectedUsuario: Usuario;
  feedback: any = {};

  get usuarioList(): Usuario[] {
    return this.usuarioService.usuarioList;
  }

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.usuarioService.load(this.filter);
  }

  select(selected: Usuario): void {
    this.selectedUsuario = selected;
  }

  delete(usuario: Usuario): void {
    if (confirm('Are you sure?')) {
      this.usuarioService.delete(usuario).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
