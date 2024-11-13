import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TextoSugestaoEditComponent } from './texto-sugestao-edit.component';
import { TextoSugestaoService } from '../texto-sugestao.service';

describe('TextoSugestaoEditComponent', () => {
  let component: TextoSugestaoEditComponent;
  let fixture: ComponentFixture<TextoSugestaoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextoSugestaoEditComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [TextoSugestaoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoSugestaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
