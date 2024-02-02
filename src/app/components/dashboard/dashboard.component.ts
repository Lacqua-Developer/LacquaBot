
import { Component, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit  {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        this.colsDash = 1;
        return [
          { title: 'Alertas', cols: 1, rows: 1 },
          { title: 'Numeros Saída', cols: 1, rows: 1 },
          { title: 'Sessoes', cols: 1, rows: 1 },
          { title: 'Contatos Ativos', cols: 1, rows: 1 },
        ];
      }
      this.colsDash = 2;
      return [
        { title: 'Alertas', cols: 1, rows: 1 },
        { title: 'Numeros Saída', cols: 1, rows: 1 },
        { title: 'Sessoes', cols: 1, rows: 1 },
        { title: 'Contatos Ativos', cols: 1, rows: 1 },
      ];
    })
  );

  @Input() Alertas = "Alertas";
  @Input() Nros = "Numeros Saída";
  @Input() Sessoes = "Sessoes";
  @Input() Contatos = "Contatos Ativos";
  @Input() colsDash = 1;

  constructor(private breakpointObserver: BreakpointObserver,
              private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {

    this.cdr.detectChanges();
  }
}
