import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContatoEditComponent } from './contato-edit.component';
import { ContatoService } from '../contato.service';

describe('ContatoEditComponent', () => {
  let component: ContatoEditComponent;
  let fixture: ComponentFixture<ContatoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ContatoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
