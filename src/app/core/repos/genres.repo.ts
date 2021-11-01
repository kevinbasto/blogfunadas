import { Genre } from "../interfaces/genre.interface";

export interface GenresRepo{
    createGenre( genre : Genre ) : Promise<any>;
    getGenre( genreId : string ) : Promise<Genre>;
    editGenre( currentName : string, genreId : string, genre : Genre ) : Promise<any>;
    deleteGenre( genreId : string ) : Promise<any>;
    getGenres() : Promise<Array<Genre>>;
}