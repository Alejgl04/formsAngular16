import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  constructor(
    private formb: FormBuilder
  ){}

  ngOnInit(): void {

  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch( key ) {
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} characters`
      }
    }
    return null;
  }

  public myForm: FormGroup = this.formb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })

  onSave(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
