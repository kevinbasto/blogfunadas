import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent implements OnInit {

  public chapterForm : FormGroup;

  constructor(
    private builder : FormBuilder
  ) {
    this.chapterForm = this.builder.group({
      title : ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

}
