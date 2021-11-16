import { Novel } from "../../interfaces/novel.interface";

export interface FetchNovelRepo {
    fetchNovel(genre : string, novel : string) : Promise<Novel>;
}
