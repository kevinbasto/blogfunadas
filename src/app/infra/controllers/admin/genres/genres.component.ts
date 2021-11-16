import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenresHeaders } from '../../../../core/constants/headers';
import { TableHeader } from '../../../../core/interfaces/table-header';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  public dataSource="genres"
  public inputHeaders : Array<TableHeader> = GenresHeaders;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  createGenre(){
    this.router.navigate(['/admin/genres/new']);
  }

}
