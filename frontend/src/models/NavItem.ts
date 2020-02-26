export interface NavItem {
  path: string;
  name: string;
  icon: string;
  subNavs: NavItem[];
}
