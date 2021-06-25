import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContatoListComponent } from './contato-list.component';
import { ContatoService } from '../contato.service';

describe('ContatoListComponent', () => {
  let component: ContatoListComponent;
  let fixture: ComponentFixture<ContatoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ContatoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
