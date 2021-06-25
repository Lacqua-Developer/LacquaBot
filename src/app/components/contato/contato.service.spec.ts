import { TestBed } from '@angular/core/testing';
import { ContatoService } from './contato.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContatoService', () => {
  let service: ContatoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContatoService]
    });

    service = TestBed.get(ContatoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
