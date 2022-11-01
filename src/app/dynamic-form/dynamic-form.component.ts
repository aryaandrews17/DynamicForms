import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormControl,FormGroup, ValidatorFn, Validators}from'@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  formFields : any[] = []


form = new FormGroup({});

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<any[]>('/assets/data.json').subscribe((formFields :any[])=>{
      for(const formField of formFields){
        this.form.addControl(formField.fieldName, new FormControl('', this.getValidator(formField)));

      }
        this.formFields = formFields;
    });
  }

  onSubmit():void{
    if(this.form.valid){
      console.log(this.form.value);
    }
  }
  
  private getValidator(formField:any):ValidatorFn[]{
    let validation: ValidatorFn[] =[];
    for(const valid of formField.validator)
    {
      switch(valid){
        case 'email':
          validation.push(Validators.email);
          break;
        case 'required':
          validation.push(Validators.required);
          break;
      }
    }
    return validation;
   }
  }


 

