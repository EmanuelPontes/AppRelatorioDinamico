import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-atributos',
  templateUrl: './cadastro-atributos.component.html',
  styleUrls: ['./cadastro-atributos.component.scss']
})
export class CadastroAtributosComponent implements OnInit {
  cadAttrbForm!: FormGroup;

  typeOptions = [
    {
      description: "Texto",
      value: 0
    },
    {
      description: "Número",
      value: 1
    },
    {
      description: "Lógico",
      value: 2
    }
  ]
  constructor(private formBuilder: FormBuilder,) { 
    this.createForm();
  }
  

  ngOnInit(): void {

    this.type?.valueChanges.subscribe(v => {
      console.log("Valor select")
      console.log(v);
    })
  }

  get name() {
    return this.cadAttrbForm.get('name');
  }

  get description() {
    return this.cadAttrbForm.get('description');
  }

  get type() {
    return this.cadAttrbForm.get('type');
  }

  private createForm() {
    this.cadAttrbForm = this.formBuilder.group({
      name: [, Validators.required],
      description: [, Validators.required],
      type: [, Validators.required],
    });
  }

}
