import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { IndexedFile } from '../../../core/interfaces/indexed-file';


@Component({
  selector: 'file-dropper',
  templateUrl: './file-dropper.component.html',
  styleUrls: ['./file-dropper.component.css']
})
export class FileDropperComponent implements OnChanges{

  public isHovering : boolean;
  @Output() file : EventEmitter<IndexedFile>;
  @Input() index : number;
  private currentIndex : number;
  constructor() {
    this.file = new EventEmitter<IndexedFile>();
  }

  

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
    let file : File = files.item(0);
    this.emitFile(file);
  }

  uploadFromButton($event : Event){
    console.log(this.index);
    let file : File = ($event.target as HTMLInputElement)?.files[0]
    this.emitFile(file);
  }

  ngOnChanges(){
    console.log(`current index  value: ${this.index}`);
  }

  emitFile(file: File){
    let indexedFile : IndexedFile = {
      file : file,
      index : this.index
    }
    this.file.emit(indexedFile);
  }

}
