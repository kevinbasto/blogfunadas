import { MenuItem } from "../interfaces/menu-item";


export const adminSidebarElements  : Array<MenuItem> = [
    {
        name: 'dashboard',
        url: 'dashboard'
    },
    {
        name : "generos",
        url : "genres"
    },
    {
        name : "terminos",
        url : "terms"
    },
    {
        name : "políticas",
        url : "policies"
    },
]

export const clientSidebarElements : Array<MenuItem> = [
    {
        name : "inicio",
        url : "latest"
    },
    {
        name : "perfil",
        url : "profile"
    }
]