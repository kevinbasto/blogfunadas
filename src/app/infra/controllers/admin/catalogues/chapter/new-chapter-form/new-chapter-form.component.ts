import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chapter } from '../../../../../../core/interfaces/chapter.interface';
import { CreateChapterService } from './create-chapter.service';

@Component({
  selector: 'app-new-chapter-form',
  templateUrl: './new-chapter-form.component.html',
  styleUrls: ['./new-chapter-form.component.css']
})
export class NewChapterFormComponent implements OnInit {

  public chapterForm : FormGroup;
  public uploading : boolean;

  constructor(
    private createChapterService : CreateChapterService,
    private fb : FormBuilder,
  ) {
    this.setFormData();
  }

  setFormData(){
    this.uploading = false;
    this.chapterForm = this.fb.group({
      title : ["", [ Validators.required ]],
      content : ["", [ Validators.required ]]
    })
  }

  ngOnInit(): void {
  }

  submit(){
    this.uploading = !this.uploading;
    let chapter : Chapter = this.chapterForm.value;
    this.createChapterService.submitChapter(chapter)
    .then(() => this.uploading = !this.uploading)
  }

  goBack(){
    this.createChapterService.goBack();
  }
}
