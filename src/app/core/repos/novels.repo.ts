import { Novel } from "../interfaces/novel.interface";

export interface NovelsRepo{
    createNovel( novel : Novel ) : Promise<any>;
    getNovel( novelId : string ) : Promise<Novel>;
    updateNovel( novelId : string, novel : Novel ) : Promise<any>;
    deleteNovel( novelId : string ) : Promise<any>;
}