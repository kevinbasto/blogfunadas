import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-chapter-form',
  templateUrl: './edit-chapter-form.component.html',
  styleUrls: ['./edit-chapter-form.component.css']
})
export class EditChapterFormComponent implements OnInit {

  public chapterForm : FormGroup;
  public uploading : boolean;

  constructor(
    private fb : FormBuilder,
  ) {
    this.setFormData();
  }

  ngOnInit(): void {
  }

  setFormData(){
    this.uploading = false;
    this.chapterForm = this.fb.group({
      title : ["", [ Validators.required ]],
      content : ["", [ Validators.required ]]
    })
  }

  submit(){}

  goBack(){}
}
