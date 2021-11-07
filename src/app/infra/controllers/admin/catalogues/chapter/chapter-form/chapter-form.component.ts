import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { Chapter, ChapterContent } from '../../../../../../core/interfaces/chapter.interface';
import { IndexedFile } from '../../../../../../core/interfaces/indexed-file';

@Component({
  selector: 'chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent implements OnChanges{

  public chapterForm : FormGroup;
  public files : Array<File>;
  public currentSelector : string;
  public content : Array<string | ArrayBuffer>;
  public uploading : boolean = false;

  @Output() chapter : EventEmitter<ChapterContent> = new EventEmitter<ChapterContent>();
  @Output() goBack : EventEmitter<void> = new EventEmitter<void>();
  @Input() Chapter : Chapter;

  constructor(
    private builder : FormBuilder
  ) {
    this.chapterForm = this.builder.group({
      title : ["", [Validators.required]],
      content : this.builder.array([])
    })
    this.files = [];
    this.content = [];
  }

  ngOnChanges(){
    if(this.Chapter)
      console.log(this.Chapter);
  }

  async pushFile( files : any, index : number){
    let file : File;
    if(files[0])
      file = files[0];
    else
      file = (files.target as HTMLInputElement)?.files[0];
    
    this.chapterContent.at(index).get("content").setValue(file.name)

    if(this.files[index])
      this.files[index] = file
    else
      this.files.push(file);
    let buffer = await this.convertToArrayBuffer(file);
    this.content[index] = buffer;
  }

  convertToArrayBuffer(file : File){
    return new Promise<ArrayBuffer | string>((resolve, reject) => {
      let fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => { 
        resolve(fr.result);
      };
    })
  }

  get chapterContent() {
    return this.chapterForm.get("content") as FormArray;
  }

  addContent(){
    const content = this.builder.group({
      content : ["", [Validators.required]],
      type : [this.currentSelector]
    })
    this.chapterContent.push(content);
    this.content.push(this.chapterContent.at(this.chapterContent.length - 1).get("type").value);
  }

  removeContent(index : number){
    // clear of the file containment
    let fileName = this.chapterContent.at(index).get("content").value;
    this.files = this.files.filter(file => {
      if(file.name != fileName)
        return file;
    })
    // clear of the file
    this.chapterContent.removeAt(index);
    //remove it from the file
    let newContent : Array<string | ArrayBuffer> = [];

    for(let i = 0; i < this.content.length; i++)
      if(i != index)
        newContent.push(this.content[i]);
    this.content = newContent;
    console.log(this.content);
  }

  updateSelector($event : MatSelectChange){
    this.currentSelector = $event.value
  }

  submit(){
    this.uploading = true;
    let files = this.files;
    let chapter : Chapter = this.chapterForm.value;
    this.chapter.emit({
      files : files,
      chapter: chapter
    });
  }

  returnToPrevious(){
    this.goBack.emit();
  }

}
