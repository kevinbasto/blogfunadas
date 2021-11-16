import { Novel } from "../../interfaces/novel.interface";
import { SystemMessage } from "../../interfaces/system-message";

export interface CreateNovelRepo{
    SaveNewNovel( genre : string, novel : Novel ) : Promise<SystemMessage>;
}