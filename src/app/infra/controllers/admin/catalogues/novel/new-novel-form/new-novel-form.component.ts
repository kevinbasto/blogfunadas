import { Component } from '@angular/core';
import { Novel } from '../../../../../../core/interfaces/novel.interface';
import { NovelCreationService } from './new-novel-creation.service';


@Component({
  selector: 'app-new-novel-form',
  templateUrl: './new-novel-form.component.html',
  styleUrls: ['./new-novel-form.component.css']
})
export class NewNovelFormComponent{

  public novel : Novel;
  public done : boolean;

  constructor(
    private createNovelService : NovelCreationService
  ) {
    this.done = false;
  }

  upload(novel : Novel){
    console.log(novel);
    this.done = true;
  }

  goBack(){
    this.createNovelService.goBack();
  }

}
