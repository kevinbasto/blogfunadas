import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChaptersHeaders } from '../../../../../../core/constants/headers';
import { Novel } from '../../../../../../core/interfaces/novel.interface';
import { TableHeader } from '../../../../../../core/interfaces/table-header';
import { EditNovelService } from '../services/edit-novel/edit-novel.service';
import { FetchNovelService } from '../services/fetch-novel/fetch-novel.service';


@Component({
  selector: 'app-edit-novel-form',
  templateUrl: './edit-novel-form.component.html',
  styleUrls: ['./edit-novel-form.component.css']
})
export class EditNovelFormComponent {


  //table for novel form
  public dataSource : string;
  public chaptersColumns : Array<TableHeader>;
  public novel : Novel;
  public done : boolean;

  constructor(
    private router : Router,
    private fetchNovelService : FetchNovelService,
    private editNovelService : EditNovelService
  ) {
    this.chaptersColumns = ChaptersHeaders;
    this.dataSource = `${this.genre}/${this.novelId}/chapters`;
    this.done = false;
    this.getData();
  }

  upload(novel : Novel){
    this.done = !this.done;
    this.editNovelService.editNovel(this.genre, this.novelId, novel)
    .then(res => console.log(res))
    .catch(err => console.log(err));
    this.done = !this.done;
  }

  private getData(){
    this.fetchNovelService.getNovel(this.genre, this.novelId)
    .then( (novel : Novel) => {
      this.novel = novel
    })
    .catch((err : any) => console.log(err));
  }

  createChapter(){
    this.router.navigate([`/admin/${this.genre}/${this.novelId}/new`])
  }
  
  goBack(){
    this.router.navigate([`/admin/${this.genre}`])
  }

  get genre(){
    let splitRoute = this.router.url.split("/");
    return splitRoute[splitRoute.length - 2];
  }

  get novelId(){
    let splitRoute = this.router.url.split("/");
    return splitRoute[splitRoute.length - 1];
  }

}
