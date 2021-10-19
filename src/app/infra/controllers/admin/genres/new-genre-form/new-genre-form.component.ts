import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../../../core/interfaces/genre.interface';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-new-genre-form',
  templateUrl: './new-genre-form.component.html',
  styleUrls: ['./new-genre-form.component.css']
})
export class NewGenreFormComponent implements OnInit {

  public genreForm : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private genresService : GenresService
  ) {
    this.genreForm = this.formBuilder.group({
      name : ["", [Validators.required]],
      creationDate :[""]
    })
  }

  ngOnInit(): void {
    this.creationDate.setValue(new Date().toUTCString())
    this.creationDate.disable();
  }

  submit(){
    let genre : Genre = this.genreForm.getRawValue();
    this.genresService.createGenre(genre)
    .then(res => {})
    .catch(err => {});
  }

  get creationDate(){
    return this.genreForm.get('creationDate');
  }
}
