import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoSugestaoComponent } from './texto-sugestao.component';

describe('TextoSugestaoComponent', () => {
  let component: TextoSugestaoComponent;
  let fixture: ComponentFixture<TextoSugestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextoSugestaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoSugestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
