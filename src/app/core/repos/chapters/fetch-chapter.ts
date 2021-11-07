import { Chapter } from "../../interfaces/chapter.interface";

export interface FetchChapterRepo{
    fetchChapter(genre : string, novel : string, chapter : string) : Promise<Chapter>;
}