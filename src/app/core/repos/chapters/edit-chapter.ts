import { ChapterContent } from "../../interfaces/chapter.interface";

export interface editChapterRepo{
    editChapter(genre : string, novel : string, chapter : string, chapterContent : ChapterContent) : Promise<void>
}