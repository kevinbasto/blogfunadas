import { InjectionToken } from "@angular/core";
import { CreateNovelRepo } from "../../../core/repos/novels/create-novel.repo";
import { EditNovelRepo } from "../../../core/repos/novels/edit-novel.repo";
import { FetchNovelRepo } from "../../../core/repos/novels/fetch-novel.repo";

export const CREATE_NOVEL_REPO = new InjectionToken<CreateNovelRepo>('CreateNovelRepo');
export const FETCH_NOVEL_REPO = new InjectionToken<FetchNovelRepo>('FetchNovelRepo');
export const EDIT_NOVEL_REPO = new InjectionToken<EditNovelRepo>('EditNovelRepo')