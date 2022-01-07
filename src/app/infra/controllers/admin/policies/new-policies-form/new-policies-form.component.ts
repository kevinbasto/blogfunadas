import { Component, OnInit } from '@angular/core';
import { Policies } from '../../../../../core/interfaces/terms.interface';
import { CreatePolicyService } from '../services/create-policy/create-policy.service';

@Component({
  selector: 'app-new-policies-form',
  templateUrl: './new-policies-form.component.html',
  styleUrls: ['./new-policies-form.component.css']
})
export class NewPoliciesFormComponent implements OnInit {

  constructor(
    private createPoliciy : CreatePolicyService
  ) { }

  ngOnInit(): void {
  }

  submit(data : Policies){
    this.createPoliciy.savePolicies(data);
  }
}
