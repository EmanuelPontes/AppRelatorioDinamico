import { TestBed } from '@angular/core/testing';

import { CadastroAtributosService } from './cadastro-atributos.service';

describe('CadastroAtributosService', () => {
  let service: CadastroAtributosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroAtributosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
