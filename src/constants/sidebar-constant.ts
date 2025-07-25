import { Album, Armchair, LayoutDashboard, SquareMenu, Users } from "lucide-react";
import { ComponentType, SVGProps } from "react";

type SidebarMenu = {
  title: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SIDEBAR_MENU_LIST: { [key: string]: SidebarMenu[] } = {
  admin: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Order',
      url: '/order',
      icon: Album
    },
    {
      title: 'Menu',
      url: '/admin/menu',
      icon: SquareMenu
    },
    {
      title: 'Table',
      url: '/admin/table',
      icon: Armchair
    },
    {
      title: 'User',
      url: '/admin/user',
      icon: Users
    },
  ]
}

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST