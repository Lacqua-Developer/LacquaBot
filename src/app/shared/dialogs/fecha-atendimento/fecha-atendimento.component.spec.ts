import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaAtendimentoComponent } from './fecha-atendimento.component';

describe('FechaAtendimentoComponent', () => {
  let component: FechaAtendimentoComponent;
  let fixture: ComponentFixture<FechaAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
