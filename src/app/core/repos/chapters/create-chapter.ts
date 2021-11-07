import { ChapterContent } from "../../interfaces/chapter.interface";
import { SystemMessage } from "../../interfaces/system-message";

export interface CreateChapter {
    createChapter(chapter : ChapterContent) : Promise<SystemMessage>;
}
