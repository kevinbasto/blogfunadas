import { InjectionToken } from "@angular/core";
import { CreateChapter } from "../../../core/repos/chapters/create-chapter";

export const CREATE_CHAPTER_REPO = new InjectionToken<CreateChapter>('CreateChapterToken');