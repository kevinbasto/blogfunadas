import { Subject } from "rxjs";
import { ChapterContent } from "../../interfaces/chapter.interface";
import { SystemMessage } from "../../interfaces/system-message";

export interface CreateChapter {
    filesUploaded : Subject<number>;
    createChapter(genre : string, novel : string, chapter : ChapterContent) : Promise<SystemMessage>;
}
