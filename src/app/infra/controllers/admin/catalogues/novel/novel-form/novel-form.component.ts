import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Novel } from '../../../../../../core/interfaces/novel.interface';
import { Staff } from '../../../../../../core/interfaces/staff';
import { LoadNovelformDataService } from '../services/load-novelform-data.service';

@Component({
  selector: 'app-novel-form',
  templateUrl: './novel-form.component.html',
  styleUrls: ['./novel-form.component.css']
})
export class NovelFormComponent implements OnChanges{

  public novelForm : FormGroup;
  @Input() public novel : Novel
  @Output() public upload : EventEmitter<Novel> = new EventEmitter<Novel>();
  @Input() public done : boolean;
  @Output() public navigateBack : EventEmitter<boolean> = new EventEmitter<boolean>();

  //form inner details
  public staff : Array<Staff>;
  public isHovering : boolean;
  public preview : ArrayBuffer | string;
  public file : File
  public uploading : boolean;
  public isDataLoaded : boolean;

  constructor(
    private builder : FormBuilder,
    private novelFormDataService : LoadNovelformDataService
  ) {
    this.uploading = false;
    this.novelForm = this.builder.group({
      name : ["", [Validators.required]],
      chapters  : [""],
      status : ["", [Validators.required]],
      author : ["", [Validators.required]],
      genre : [""],
      translators : this.builder.array([])
    })
    if(this.novel)
      this.novelForm.setValue(this.novel);
    this.novelFormDataService.getStaff()
    .then(staff => {
      this.staff = staff;
    })
  }

  ngOnChanges(){
    if(!this.isDataLoaded){
      this.loadData();
    }
    if(this.done)
      this.uploading = !this.uploading;
  }

  async loadData(){
    
    let fields = ["name", "chapters", "status", "author", "genre"]
    if(this.novel)
      for(let field of fields)
        this.novelForm.get(field).setValue(this.novel[field]);
    else
      this.setDefaultData();
    this.isDataLoaded = true;
  }

  private async setDefaultData(){
    await this.novelFormDataService.getDefaultEditor()
    .then(editor => {
      this.addTranslator();
      this.translators.at(0).get("translator").setValue(editor)
    })
    let genre : string = this.novelFormDataService.getGenre();
    this.novelForm.get("genre").setValue(genre);
    this.novelForm.get("chapters").setValue(0);
    this.disableFields();
  }

  private disableFields(){
    this.novelForm.get("genre").disable();
    this.novelForm.get("chapters").disable();
    this.translators.at(0).get("translator").disable();
  }

  submitForm(){
    this.uploading = !this.uploading;
    let novel : Novel = this.novelForm.value;
    this.upload.emit(novel);
  }

  goBack(){
    this.navigateBack.emit(true);
  }

  get translators(){
    return this.novelForm.get('translators') as FormArray;
  }

  addTranslator(){
    const translator = this.builder.group({
      translator : ["", [Validators.required]]
    });
    this.translators.push(translator)
  }

  deleteTranslator(i : any){
    this.translators.removeAt(i)
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
      this.file = files.item(0);
      this.processImageToVisualize();
  }

  uploadFromButton($event : Event){
    this.file = ($event.target as HTMLInputElement)?.files[0];
    this.processImageToVisualize();
  }

  private processImageToVisualize(){
    let fr = new FileReader();
    fr.readAsDataURL(this.file);
    fr.onload = () => { this.preview = fr.result };
  }

}
