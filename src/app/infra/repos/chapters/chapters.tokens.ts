import { InjectionToken } from "@angular/core";
import { CreateChapter } from "../../../core/repos/chapters/create-chapter";
import { editChapterRepo } from "../../../core/repos/chapters/edit-chapter";
import { FetchChapterRepo } from "../../../core/repos/chapters/fetch-chapter";

export const CREATE_CHAPTER_REPO = new InjectionToken<CreateChapter>('CreateChapterToken');
export const FETCH_CHAPTER_REPO = new InjectionToken<FetchChapterRepo>('FetchChapterToken');
export const EDIT_CHAPTER_REPO = new InjectionToken<editChapterRepo>('EditChapterRepo')