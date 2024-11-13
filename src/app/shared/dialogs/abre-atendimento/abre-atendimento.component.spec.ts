import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbreAtendimentoComponent } from './abre-atendimento.component';

describe('AbreAtendimentoComponent', () => {
  let component: AbreAtendimentoComponent;
  let fixture: ComponentFixture<AbreAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbreAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbreAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
