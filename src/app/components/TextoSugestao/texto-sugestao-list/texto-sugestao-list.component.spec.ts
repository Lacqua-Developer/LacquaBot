import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TextoSugestaoListComponent } from './texto-sugestao-list.component';
import { TextoSugestaoService } from '../texto-sugestao.service';

describe('TextoSugestaoListComponent', () => {
  let component: TextoSugestaoListComponent;
  let fixture: ComponentFixture<TextoSugestaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextoSugestaoListComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [TextoSugestaoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoSugestaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
