import { Novel } from "../../interfaces/novel.interface";
import { SystemMessage } from "../../interfaces/system-message";

export interface EditNovelRepo{
    editNovel( genre : string, novel : string, content : Novel ) : Promise<SystemMessage>;
}