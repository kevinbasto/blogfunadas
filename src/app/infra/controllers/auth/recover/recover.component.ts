import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemMessage } from '../../../../core/interfaces/system-message';
import { RecoverService } from '../../../services/auth-related/recover/recover.service';
import { RecoverServiceToken } from '../../../services/services.token';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  public recoverForm : FormGroup;
  public message : SystemMessage;
  public messageClass : string;

  constructor(
    private formBuilder : FormBuilder,
    @Inject(RecoverServiceToken) private recoverService : RecoverService
  ) {
    this.recoverForm = this.formBuilder.group({
      email : ["", [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  submit(){
    this.recoverService.recoverEmailAccount(this.email.value)
    .then(res => {
      this.message = res;
      this.messageClass = "success";
    })
    .catch(error => {
      this.messageClass = error;
      this.messageClass = "failure";
    })
  }

  get email(){
    return this.recoverForm.get('email');
  }
}
