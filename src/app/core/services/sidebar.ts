import { MenuItem } from "../interfaces/menu-item";

export interface Sidebar {
    getMenuItems(menu : string) : Promise<Array<MenuItem>>;
}
