import { Injectable } from '@angular/core';
import { GenresRepo } from '../../core/repos/genres.repo';

@Injectable()
export class GenresRepoService implements GenresRepo {

  constructor() { }

  async createGenre() : Promise<any> {}

  async deleteGenre() : Promise<any> {}

  async editGenre() : Promise<any> {}

  async getGenre() : Promise<any> {}

  async getGenres() : Promise<any> {}
}
