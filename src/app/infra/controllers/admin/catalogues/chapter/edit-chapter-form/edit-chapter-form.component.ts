import { Component, OnInit } from '@angular/core';
import { Chapter, ChapterContent } from '../../../../../../core/interfaces/chapter.interface';
import { EditChapterService } from '../services/edit-chapter/edit-chapter.service';
import { FetchChapterService } from '../services/fetch-chapter/fetch-chapter.service';


@Component({
  selector: 'app-edit-chapter-form',
  templateUrl: './edit-chapter-form.component.html',
  styleUrls: ['./edit-chapter-form.component.css']
})
export class EditChapterFormComponent implements OnInit {

  chapter : Chapter

  constructor(
    private editChaperService : EditChapterService,
    private fethcChapterService : FetchChapterService
  ) {
    this.fetchData()
  }

  ngOnInit(): void {}

  private fetchData(){
    this.fethcChapterService.fetchChapter()
    .then(chapter => this.chapter = chapter)
    .catch(err => {
      console.log(err);
    });
  }

  goBack(){
    this.fethcChapterService.goBack();
  }

  upload(chapter : ChapterContent){
    console.log(chapter);
  }

}
