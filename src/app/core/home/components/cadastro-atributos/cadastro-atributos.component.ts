import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Atributo } from '../../models/Atributo';
import { CadastroAtributosService } from '../../services/cadastro-atributos/cadastro-atributos.service';

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

  selectedListAttr: Array<Atributo>;
  listAtributos: Array<Atributo>;

  subscriptions: Array<Subscription>;

  constructor(private formBuilder: FormBuilder, private cadastroAtributoService: CadastroAtributosService) { 
    this.createForm();
    this.listAtributos = [];
    this.subscriptions = [];
    this.selectedListAttr = [];
  }
  

  ngOnInit(): void {

    this.type?.valueChanges.subscribe(v => {
      console.log("Valor select")
      console.log(v);
    })

    this.subscriptions.push(this.getAtributoList());
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  public onDelete () {
    console.log(this.selectedListAttr)
    this.selectedListAttr.forEach((attrb) => {
      let subscribtion = this.cadastroAtributoService.deleteAtributo(attrb.id).subscribe(
        (res) => {
          this.getAtributoList();
          setTimeout(() => {
            subscribtion.unsubscribe();
          }, 100);
        },
        (err) => {
          setTimeout(() => {
            subscribtion.unsubscribe();
          }, 100);
        }
      )
    })
  }
  public onSubmitForm () {

    let atributo = new Atributo(this.name?.value,this.description?.value, this.type?.value);
    let subscribtion = this.cadastroAtributoService.postAtributo(atributo).subscribe(
      (response) => {

        this.getAtributoList();
        setTimeout(() => {
          subscribtion.unsubscribe();
        }, 100);
      },
      (error) => {
        setTimeout(() => {
          subscribtion.unsubscribe();
        }, 100);
        
      }
    )
  }

  public getAtributoList() {
    return this.cadastroAtributoService.getAtributos().subscribe(
      (response: Array<Atributo>) => {
        this.listAtributos = response;
      },
      (error) => {}
    )
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
