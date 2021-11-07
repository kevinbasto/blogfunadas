import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chapter, ChapterContent } from '../../../../../../core/interfaces/chapter.interface';
import { CreateChapterService } from './create-chapter.service';

@Component({
  selector: 'app-new-chapter-form',
  templateUrl: './new-chapter-form.component.html',
  styleUrls: ['./new-chapter-form.component.css']
})
export class NewChapterFormComponent implements OnInit {

  public chapterForm : FormGroup;
  public uploading : boolean;
  public done : boolean;

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

  goBack(){
    this.createChapterService.goBack();
  }

  upload(chapter : ChapterContent){
    console.log(chapter);
  }
}
