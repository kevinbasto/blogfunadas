import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from '../../../../../core/interfaces/genre.interface';
import { EditGenreService } from './edit-genre.service';

@Component({
  selector: 'app-edit-genre-form',
  templateUrl: './edit-genre-form.component.html',
  styleUrls: ['./edit-genre-form.component.css']
})
export class EditGenreFormComponent implements OnInit {

  public genreForm : FormGroup
  public uploading : boolean;

  constructor(
    private formBuilder : FormBuilder,
    private editGenre : EditGenreService,
    private router : Router
  ) {
    this.genreForm = this.formBuilder.group({
      name : ["", [Validators.required]],
      creationDate :[""]
    });
    this.uploading = false;
  }

  ngOnInit(): void {
    this.creationDate.setValue(new Date().toUTCString())
    this.creationDate.disable();
    this.getData();
  }

  private getData(){
    this.editGenre.getData()
    .then(res => {
      this.name.setValue(res.name);
    })
    .catch(err => {
      console.log(err);
    })
  }

  submit(){
    this.uploading = !this.uploading;
    let genre : Genre = this.genreForm.getRawValue();
  }

  get name(){
    return this.genreForm.get("name");
  }

  get creationDate(){
    return this.genreForm.get('creationDate');
  }

  goBack(){
    this.router.navigate([`/admin/genres`])
  }

}
