import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioEditComponent } from './usuario-edit.component';
import { UsuarioService } from '../usuario.service';

describe('UsuarioEditComponent', () => {
  let component: UsuarioEditComponent;
  let fixture: ComponentFixture<UsuarioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UsuarioService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
