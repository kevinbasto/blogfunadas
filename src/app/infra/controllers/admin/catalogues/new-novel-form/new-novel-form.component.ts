import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Staff } from '../../../../../core/interfaces/staff';
import { NovelCreationService } from './new-novel-creation.service';

@Component({
  selector: 'app-novel-form',
  templateUrl: './new-novel-form.component.html',
  styleUrls: ['./new-novel-form.component.css']
})
export class NewNovelFormComponent implements OnInit {

  public novelForm : FormGroup;
  public staff : Array<Staff>;
  public uploading : boolean;

  constructor(
    private formBuilder : FormBuilder,
    private novelCreation : NovelCreationService,
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
  }

  ngOnInit(): void {
    this.setUnchangeableData();
    this.novelCreation.getStaff()
    .then(staff => this.staff = staff)
  }

  setUnchangeableData(){
    // setting unchangable data
    this.setChaptersData();
    this.setGenreData();
    this.setTranslatorData();
  }

  private setChaptersData(){
    this.chapters.setValue(0);
    this.chapters.disable();
    
  }

  private setGenreData(){
    let genre = this.router.url.split("/").filter(element => {
      if(element != "")
        return element
    })[1];
    this.genre.setValue(genre);
    this.genre.disable();
  }

  private setTranslatorData(){
    this.addTranslator();
    this.novelCreation.getUid().then(uid => {
      this.translators.at(0).get('translator').setValue(uid)
      this.translators.at(0).disable();
    })
  }

  submit(){
    this.uploading = !this.uploading;
    let form : any = this.novelForm.getRawValue();
    form.translators = form.translators.map((translator : any) => {
      return translator.translator
    })
    this.novelCreation.createNovel(this.genre.value, form)
    .then(res => {
      this.uploading = !this.uploading;
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
