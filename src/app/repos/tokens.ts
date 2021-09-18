import { InjectionToken } from "@angular/core";
import { ChaptersRepo } from "../core/repos/chapters.repo";
import { CommentsRepo } from "../core/repos/comments.repo";
import { GenresRepo } from "../core/repos/genres.repo";
import { NovelsRepo } from "../core/repos/novels.repo";
import { UsersRepo } from "../core/repos/users.repo";

export const USERS_REPO = new InjectionToken<UsersRepo>('UsersRepo');
export const GENRES_REPO = new InjectionToken<GenresRepo>('GenresRepo');
export const NOVELS_REPO = new InjectionToken<NovelsRepo>('NovelsRepo');
export const CHAPTERS_REPO = new InjectionToken<ChaptersRepo>('ChaptersRepo');
export const COMMENTS_REPO = new InjectionToken<CommentsRepo>('CommentsRepo');