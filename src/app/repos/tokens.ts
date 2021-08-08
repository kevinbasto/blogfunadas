import { InjectionToken } from "@angular/core";
import { GenresRepo } from "../core/repos/genres.repo";

export const GENRES_REPO = new InjectionToken<GenresRepo>('GenresRepo');