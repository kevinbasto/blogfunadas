import { Novel } from "../interfaces/novel.interface";
import { SystemMessage } from "../interfaces/system-message";

export interface NovelsRepo{
    createNovel( genre : string, novel : Novel ) : Promise<SystemMessage>;
    getNovel( genre : string, novelId : string ) : Promise<Novel>;
    updateNovel( genre : string, novelId : string, novel : Novel ) : Promise<any>;
    deleteNovel( genre : string, novelId : string ) : Promise<any>;
    getNovels( genre : string, page : number, pageSize : number) : Promise<Array<Novel>>;
}