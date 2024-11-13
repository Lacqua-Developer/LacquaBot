import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoAtendimentoComponent } from './texto-atendimento.component';

describe('TextoAtendimentoComponent', () => {
  let component: TextoAtendimentoComponent;
  let fixture: ComponentFixture<TextoAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
