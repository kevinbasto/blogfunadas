import { Component } from '@angular/core';
import { Novel } from '../../../../../../core/interfaces/novel.interface';
import { CreateNovelService } from '../services/create/create-novel.service';


@Component({
  selector: 'app-new-novel-form',
  templateUrl: './new-novel-form.component.html',
  styleUrls: ['./new-novel-form.component.css']
})
export class NewNovelFormComponent{

  public novel : Novel;
  public done : boolean;

  constructor(
    private createNovelService : CreateNovelService
  ) {
    this.done = false;
  }

  upload(novel : Novel){
    this.done  = false;
    this.createNovelService.createNovel(novel)
    .then(message => {
      console.log(message);
    })
    .catch(error => {
      console.log(error);
    })
    this.done = true;
  }

  goBack(){
    this.createNovelService.goBack();
  }

}
