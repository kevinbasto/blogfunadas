export interface Novel{
    id? : number;
    name : string;
    chapters : number;
    status : string;
    author : string;
    genre : string;
    translators : Array<string>;
    url? : string;
}