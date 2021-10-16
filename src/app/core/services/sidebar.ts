import { Subject } from "rxjs";
import { MenuItem } from "../interfaces/menu-item";

export interface Sidebar {
    menuItems : Subject<Array<MenuItem>>;
    navigateToMenu() : void;
    signOut() : void;
}
