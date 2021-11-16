export interface ChapterFile{
    index : number;
    file : File
}

export interface Content {
    content : string,
    type : string;
}

export interface Chapter{
    title : string;
    content : Array<Content>;
    id? : number;
    url? : string;
}

export interface ChapterContent{
    files : Array<ChapterFile>,
    chapter : Chapter
}