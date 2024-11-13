import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimentoComponent } from './seguimento.component';

describe('SeguimentoComponent', () => {
  let component: SeguimentoComponent;
  let fixture: ComponentFixture<SeguimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
