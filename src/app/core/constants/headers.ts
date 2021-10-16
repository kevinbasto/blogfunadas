import { TableHeader } from "../interfaces/table-header";

export const DashboardHeaders : Array<TableHeader>  = [{ name : "género", property : "genre"}, { name : "novela", property : "novel"}];
export const UsersHeaders     : Array<TableHeader>  = [{ name : "usuario", property : "username"}, { name : "correo", property : "email"}];
export const GenresHeaders    : Array<TableHeader>  = [{ name : "nombre", property : "name"}, { name : "fecha", property : "date"}];
export const NovelsHeaders    : Array<TableHeader>  = [{ name : "nombre", property : "name"},{ name : "capítulos", property: "chapters"}];
export const ChaptersHeaders  : Array<TableHeader>  = [{ name : "id", property : "id"},{ name : "nombre", property: "name"}];
export const TersmHeaders     : Array<TableHeader>  = [{ name : "fecha", property : "date"}];
export const PrivacyHeaders   : Array<TableHeader>  = [{ name : "fecha", property : "date"}];
