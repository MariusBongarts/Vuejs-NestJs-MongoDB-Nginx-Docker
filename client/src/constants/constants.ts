import { NavItem } from '../models/NavItem';

export const CONSTANTS = {
  NAVITEMS: [
    {
      path: '/home',
      icon: 'dashboard',
      name: 'navigation.home',
      subNavs: []
    },
    {
      path: '/calendar',
      icon: 'calendar_today',
      name: 'navigation.calendar',
      subNavs: []
    },
    {
      path: '/customers',
      icon: 'people',
      name: 'navigation.customers',
      subNavs: []
    },
    {
      path: '/company',
      icon: 'house',
      name: 'navigation.company',
      subNavs: []
    }
  ] as NavItem[]
};
