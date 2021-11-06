import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chapter } from '../../../../../../core/interfaces/chapter.interface';
import { EditChapterService } from './edit-chapter.service';

@Component({
  selector: 'app-edit-chapter-form',
  templateUrl: './edit-chapter-form.component.html',
  styleUrls: ['./edit-chapter-form.component.css']
})
export class EditChapterFormComponent implements OnInit {

  public chapterForm : FormGroup;
  public uploading : boolean;

  constructor(
    private editChapterService : EditChapterService,
    private fb : FormBuilder,
  ) {
    this.setFormData();
    this.fetchData();
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

  private fetchData(){
    this.editChapterService.fetchChapterData()
    .then(res => {
      this.title.setValue(res.title);
      this.content.setValue(res.content);
    })
    .catch(err => console.log(err));
  }

  submit(){
    this.uploading = !this.uploading;
    let content : Chapter = this.chapterForm.value;
    this.editChapterService.updateData(content)
    .then(res => { 
      this.uploading = !this.uploading;
      console.log(res);
    })
    .catch(err => { console.log(err); });
  }

  goBack(){
    this.editChapterService.goback();
  }

  get title(){
    return this.chapterForm.get("title");
  }

  get content(){
    return this.chapterForm.get("content");
  }
}
