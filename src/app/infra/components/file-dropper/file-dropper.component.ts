import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';


@Component({
  selector: 'file-dropper',
  templateUrl: './file-dropper.component.html',
  styleUrls: ['./file-dropper.component.css']
})
export class FileDropperComponent{

  public isHovering : boolean;
  @Output() file : EventEmitter<File> = new EventEmitter<File>();

  constructor() {
    this.file = new EventEmitter<File>();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
    let file : File = files.item(0);
    this.emitFile(file);
  }

  uploadFromButton($event : Event){
    let file : File = ($event.target as HTMLInputElement)?.files[0]
    this.emitFile(file);
  }

  emitFile(file: File){
    if(file.type.includes("image"))
      this.file.emit(file);
  }

}
