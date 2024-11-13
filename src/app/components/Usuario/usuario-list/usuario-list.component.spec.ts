import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioListComponent } from './usuario-list.component';
import { UsuarioService } from '../usuario.service';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UsuarioService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
