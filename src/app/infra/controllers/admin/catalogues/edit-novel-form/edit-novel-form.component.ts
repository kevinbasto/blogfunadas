import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChaptersHeaders } from '../../../../../core/constants/headers';
import { Novel } from '../../../../../core/interfaces/novel.interface';
import { Staff } from '../../../../../core/interfaces/staff';
import { TableHeader } from '../../../../../core/interfaces/table-header';
import { EditNovelFormService } from './edit-novel-form.service';

@Component({
  selector: 'app-edit-novel-form',
  templateUrl: './edit-novel-form.component.html',
  styleUrls: ['./edit-novel-form.component.css']
})
export class EditNovelFormComponent implements OnInit {

  public novelForm : FormGroup;
  public staff : Array<Staff>;
  public uploading : boolean;
  public dataSource : string;
  public chaptersColumns : Array<TableHeader>;

  constructor(
    private formBuilder : FormBuilder,
    public editNovelService : EditNovelFormService,
    private router : Router
  ) {
    this.novelForm = this.formBuilder.group({
      name : ["", [Validators.required]],
      chapters  : [""],
      status : ["", [Validators.required]],
      author : ["", [Validators.required]],
      genre : [""],
      translators : this.formBuilder.array([])
    })
    this.uploading = false;
    this.chaptersColumns = ChaptersHeaders;
    let splitRoute = this.router.url.split("/");
    let novel = splitRoute[splitRoute.length - 1];
    let genre = splitRoute[splitRoute.length - 2];
    this.dataSource = `${genre}/${novel}/chapters`;
    console.log(this.dataSource);
  }

  ngOnInit(): void {
    this.getData();
    this.editNovelService.getStaff()
    .then(staff => this.staff = staff)
    
  }

  submit(){
    this.uploading = !this.uploading;
    let splitRoute = this.router.url.split("/");
    let novel = splitRoute[splitRoute.length - 1];
    let genre = splitRoute[splitRoute.length - 2];
    let novelData : any = this.novelForm.getRawValue();
    novelData.translators = novelData.translators.map((translator : any) => {
      return translator.translator
    })
    this.editNovelService.editNovel(genre, novel, novelData)
    .then(() => {
      this.router.navigate([`/admin/${genre}`])
      this.uploading = !this.uploading
    });
  }

  private getData(){
    let splitRoute = this.router.url.split("/");
    let novel = splitRoute[splitRoute.length - 1];
    let genre = splitRoute[splitRoute.length - 2];
    this.editNovelService.getNovelData(genre, novel)
    .then(data => {
      this.name.setValue(data.name);
      this.chapters.setValue(data.chapters);
      this.status.setValue(data.status);
      this.author.setValue(data.author);
      this.genre.setValue(data.genre);
      data.translators.forEach((translator, index) => {
        this.addTranslator();
        this.translators.at(index).get("translator").setValue(translator);
      })
      this.chapters.disable();
      this.genre.disable();
      this.translators.at(0).disable();
    })
    .catch(error => {
      console.log(error);
    })
  }

  
  get name(){
    return this.novelForm.get('name')
  }

  get chapters(){
    return this.novelForm.get('chapters')
  }

  get status(){
    return this.novelForm.get('status')
  }

  get author(){
    return this.novelForm.get('author')
  }

  get genre(){
    return this.novelForm.get('genre')
  }

  get translators(){
    return this.novelForm.get('translators') as FormArray;
  }

  addTranslator(){
    const translator = this.formBuilder.group({
      translator : ["", [Validators.required]]
    });
    this.translators.push(translator)
  }

  deleteTranslator(i : any){
    this.translators.removeAt(i)
  }

  goBack(){
    this.router.navigate([`/admin/${this.genre.value}`])
  }

}
