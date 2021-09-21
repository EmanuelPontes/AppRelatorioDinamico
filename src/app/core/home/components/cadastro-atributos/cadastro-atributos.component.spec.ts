import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAtributosComponent } from './cadastro-atributos.component';

describe('CadastroAtributosComponent', () => {
  let component: CadastroAtributosComponent;
  let fixture: ComponentFixture<CadastroAtributosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAtributosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAtributosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
