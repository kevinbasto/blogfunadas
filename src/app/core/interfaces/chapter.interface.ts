export interface content {
    content : string,
    type : string;
}

export interface Chapter{
    title : string;
    content : Array<content>;
    id? : number;
}

export interface ChapterContent{
    files : Array<File>,
    chapter : Chapter
}