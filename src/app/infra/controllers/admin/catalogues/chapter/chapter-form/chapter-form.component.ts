import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { Chapter, ChapterContent } from '../../../../../../core/interfaces/chapter.interface';

@Component({
  selector: 'chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent{

  public chapterForm : FormGroup;
  private files : Array<File>;
  public contentStructure : Array<string>;
  public currentSelector : string;  
  public contentValue : Array<any>;
  public uploading : boolean = false;

  @Output() chapter : EventEmitter<ChapterContent> = new EventEmitter<ChapterContent>();
  @Output() goBack : EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private builder : FormBuilder
  ) {
    this.chapterForm = this.builder.group({
      title : ["", [Validators.required]],
      content : this.builder.array([])
    })
    this.files = []
    this.contentStructure = [];
    this.contentValue = new Array<any>();
  }

  async pushFile(file : File, index : number){
    this.files.push(file);
    this.chapterContent.at(index).get('content').setValue(file.name)
    let buffer = await this.convertToArrayBuffer(file)
    this.contentValue.push(buffer);
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
    });
    this.chapterContent.push(content);
    this.contentStructure.push(this.currentSelector);
    if(this.currentSelector == "text")
      this.contentValue.push(content.get("content").value)
  }

  removeContent(index : number){
    //file remotion from the array
    let name = this.chapterContent.at(index).get("content").value;
    this.files = this.files.filter(file => {
      if(file.name != name)
        return file;
    })
    //removing it from the array
    this.chapterContent.removeAt(index);
    //removing it from the chapter structure
    let newContentStructure : Array<string> = new Array<string>();
    for(let i = 0; i < this.contentStructure.length; i++){
      if(i != index)
        newContentStructure.push(this.contentStructure[i])
    }
    this.contentStructure = newContentStructure;
    //cleaning up the file buffer array
    this.contentValue = this.contentValue.filter(element => {
      if(element != this.contentValue[index])
        return element;
    })
  }

  updateSelector($event : MatSelectChange){
    this.currentSelector = $event.value
  }

  submit(){
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
