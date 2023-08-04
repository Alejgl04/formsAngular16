import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-pagee.component.html',
  styles: [
  ]
})
export class DynamicPageeComponent {
  constructor( private fb: FormBuilder ){}

  public myDynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Fifa 2023', Validators.required],
      ['Prince Persia', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required )

  get favoriteGamesControls() {
    return this.myDynamicForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myDynamicForm.controls[field].errors
      && this.myDynamicForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myDynamicForm.controls[field] ) return null;
    const errors = this.myDynamicForm.controls[field].errors || {};

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

  addToFavorites(): void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    this.favoriteGamesControls.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  onDeleteFavoriteGame( index: number ): void {
    this.favoriteGamesControls.removeAt(index);
  }

  onSubmit(): void {
    if ( this.myDynamicForm.invalid ) {
      this.myDynamicForm.markAllAsTouched();
      return;
    }
    console.log(this.myDynamicForm.value);
    (this.myDynamicForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myDynamicForm.reset();
  }
}
