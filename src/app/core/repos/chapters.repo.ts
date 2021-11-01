import { Chapter } from "../interfaces/chapter.interface";

export interface ChaptersRepo{
    createChapter( genre : string, novel : string, chapter : Chapter) : Promise<any>;
    getChapter( genre : string, novel : string, chapter : string ) : Promise<Chapter>;
    updateChapter( genre : string, novel : string, chapterId : string, chapter: Chapter) : Promise<any>;
    deleteChapter( genre : string, novel : string, chapterId : string) : Promise<any>;
}