import { TestBed } from '@angular/core/testing';
import { TextoSugestaoService } from './texto-sugestao.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TextoSugestaoService', () => {
  let service: TextoSugestaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextoSugestaoService]
    });

    service = TestBed.get(TextoSugestaoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
