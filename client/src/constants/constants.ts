import i18n from '@/i18n';
import { NavItem } from '../models/NavItem';

export const CONSTANTS = {
  NAVITEMS: [
    {
      path: '/home',
      icon: 'dashboard',
      name: i18n.t('navigation.home'),
      subNavs: []
    },
    {
      path: '/calendar',
      icon: 'calendar_today',
      name: i18n.t('navigation.calendar'),
      subNavs: []
    },
    {
      path: '/customers',
      icon: 'people',
      name: i18n.t('navigation.customers'),
      subNavs: []
    },
    {
      path: '/company',
      icon: 'house',
      name: i18n.t('navigation.company'),
      subNavs: []
    }
  ] as NavItem[]
};
