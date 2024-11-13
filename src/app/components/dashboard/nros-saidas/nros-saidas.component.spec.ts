import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrosSaidasComponent } from './nros-saidas.component';

describe('NrosSaidasComponent', () => {
  let component: NrosSaidasComponent;
  let fixture: ComponentFixture<NrosSaidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrosSaidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NrosSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
