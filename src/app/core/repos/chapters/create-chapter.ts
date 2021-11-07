import { ChapterContent } from "../../interfaces/chapter.interface";
import { SystemMessage } from "../../interfaces/system-message";

export interface CreateChapter {
    createChapter(genre : string, novel : string, chapter : ChapterContent) : Promise<SystemMessage>;
}
