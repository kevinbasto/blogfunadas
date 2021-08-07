import { Genre } from "../interfaces/genre.interface";

export interface GenresRepo{
    createGenre( genre : Genre ) : Promise<any>;
    getGenre( genreId : string ) : Promise<Genre>;
    editGenre( genreId : string, genre : Genre ) : Promise<any>;
    deleteGenre( genreId : string ) : Promise<any>;
    getGenres( pageSize : number, startAt : number ) : Promise<Array<Genre>>;
}