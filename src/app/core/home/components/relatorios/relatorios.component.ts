import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Atributo } from '../../models/Atributo';
import { CadastroAtributosService } from '../../services/cadastro-atributos/cadastro-atributos.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit, OnDestroy {

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
    },
    {
      description: "Data",
      value: 3
    }
  ]

  isLinear = true;
  attrbsSelctForm!: FormGroup;
  reportLayoutForm!: FormGroup;
  listAtributos: Array<Atributo>;
  subscriptions: Array<Subscription>;
  displayedColumns: string[];
  columnsToDisplay: string[];

  constructor(private formBuilder: FormBuilder,
              private cadastroAtributoService: CadastroAtributosService) { 
    this.createForm();
    this.listAtributos = [];
    this.subscriptions = [];
    this.displayedColumns = [];
    this.columnsToDisplay = [];
  }

  get attributes(){
    return this.attrbsSelctForm.get('attributes') as FormArray;
  }

  get sequence(){
    return this.reportLayoutForm.get('sequence') as FormArray;
  }

  get isVisible() {
    return this.reportLayoutForm.get('isVisible') as FormArray;
  }

  get accumulator() {
    return this.reportLayoutForm.get('accumulator') as FormArray;
  }

  get isBreak() {
    return this.reportLayoutForm.get('isBreak') as FormArray;
  }

  get orderByAsc() {
    return this.reportLayoutForm.get('orderByAsc') as FormArray;
  }

  get orderByDsc() {
    return this.reportLayoutForm.get('orderByDsc') as FormArray;
  }

  get isOrderInSequence() {
    return this.reportLayoutForm.get('isOrderInSequence') as FormArray;
  }



  ngOnInit(): void {
    this.sequence?.valueChanges.subscribe((v: Array<Atributo>) => {
      console.log(v);
      if (v.length) {

        v.forEach((att) => {
          let index = this.attributes?.value.indexOf(att);
          let indexNd = v.indexOf(att)
          if (index !== indexNd) {
            let aux = this.attributes?.value[indexNd];
            console.log(aux);
            let arrCopy = this.attributes?.value;
            arrCopy[indexNd] = this.attributes?.value[index];
            arrCopy[index] = aux;
            this.attributes.setValue(arrCopy);
            console.log(arrCopy);
          }
        })
        
      }
      
    });

    this.attributes?.valueChanges.subscribe((v: Array<Atributo>) => {
      this.displayedColumns = [];
      this.columnsToDisplay = [];
      v.forEach((attr) => {
        this.displayedColumns.push(attr.name.toString());
        this.columnsToDisplay.push(attr.name.toString());
      });
      
    })
    this.subscriptions.push(this.getAtributoList());
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  public getOrderByAscList(): Array<Atributo> {
    let arr: Array<Atributo> = [];
    if (this.attributes.value) {
      arr = this.attributes.value.filter((att: Atributo, idx: number) => {
        return this.orderByDsc.value ? !this.orderByDsc.value.includes(att) : true;
      })
    } 
    return arr;
  }

  public getOrderByDscList(): Array<Atributo> {
    let arr: Array<Atributo> = [];
    if (this.attributes.value) {
      arr = this.attributes.value.filter((att: Atributo, idx: number) => {
        return this.orderByAsc.value ? !this.orderByAsc.value.includes(att) : true;
      })
    } 
    return arr;
  }

  public getOrderByList(): Array<Atributo> {
    let arr: Array<Atributo> = [];
    if (this.orderByAsc.value && this.orderByDsc.value) {
      arr = this.orderByAsc.value.concat(this.orderByDsc.value);
    } else {
      arr = this.orderByAsc.value ? this.orderByAsc.value : [];
      arr = arr.concat(this.orderByDsc.value ? this.orderByDsc.value : []);
    }

    
    return arr;
  }

  public isOrderBy(attributeName?: string) {
    
    if (this.orderByAsc?.value) {
      return this.orderByAsc?.value.find((v: Atributo) => v.name.toString() === attributeName) !== undefined;
    }

    return false;
    
  }

  public changeTable() {
    this.columnsToDisplay.sort((a,b) =>  -1);
    console.log(this.columnsToDisplay);
  }

  public getTypeDescription(type: Number) {
    return this.typeOptions.find(option => option.value === type)?.description;
  }

  public getAtributoList() {
    return this.cadastroAtributoService.getAtributos().subscribe(
      (response: Array<Atributo>) => {
        this.listAtributos = response;
      },
      (error) => {}
    )
  }

  private createForm() {
    this.attrbsSelctForm = this.formBuilder.group({
      attributes: [, Validators.required],
    });

    this.reportLayoutForm = this.formBuilder.group({
      sequence: [],
      isVisible: [],
      accumulator: [],
      isBreak: [],
      orderByAsc: [],
      orderByDsc: [ ],
      isOrderInSequence: [],
    });
  }
}
