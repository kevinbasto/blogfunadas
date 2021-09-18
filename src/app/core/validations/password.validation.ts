import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
  } from '@angular/forms';
  import { ErrorStateMatcher } from '@angular/material/core';
  
  export class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
      control: FormControl | null,
      form: FormGroupDirective | NgForm | null
    ): boolean {
      const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
      const invalidParent = !!(
        control &&
        control.parent &&
        control.parent.invalid &&
        control.parent.dirty
      );
  
      return invalidCtrl || invalidParent;
    }
  }
  
  export const checkPasswords = (group: FormGroup) => {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
  
    return pass === confirmPass ? null : { notSame: true };
  };
  