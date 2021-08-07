import { promise } from "protractor";
import { Genre } from "../interfaces/genre.interface";

export interface genresRepo{
    createGenre( genre : Genre ) : Promise<any>;
    getGenre( genreId : string ) : Promise<Genre>;
    editGenre( genreId : string, genre : Genre ) : Promise<any>;
    deleteGenre( genreId : string ) : Promise<any>;
}