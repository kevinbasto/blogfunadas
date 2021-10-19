import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Staff } from '../../../../../core/interfaces/staff';
import { NovelCreationService } from './novel-creation.service';

@Component({
  selector: 'app-novel-form',
  templateUrl: './novel-form.component.html',
  styleUrls: ['./novel-form.component.css']
})
export class NovelFormComponent implements OnInit {

  public novelForm : FormGroup;
  public staff : Array<Staff>;

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
  }

  ngOnInit(): void {
    this.setUnchangeableData();
    this.novelCreation.getStaff()
    .then(staff => this.staff = staff)
  }

  setUnchangeableData(){
    let genre = this.router.url.split("/").filter(element => {
      if(element != "")
        return element
    })[1];
    // setting unchangable data
    this.chapters.setValue(0);
    this.chapters.disable();
    this.genre.setValue(genre);
    this.genre.disable();
    this.addTranslator();
    this.novelCreation.getUid().then(uid => {
      this.translators.at(0).get('translator').setValue(uid)
      this.translators.at(0).disable();
    })
  }

  submit(){
    let form : any = this.novelForm.getRawValue();
    form.translators = form.translators.map((translator : any) => {
      return translator.translator
    })
    this.novelCreation.createNovel(this.genre.value, form);
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
}
