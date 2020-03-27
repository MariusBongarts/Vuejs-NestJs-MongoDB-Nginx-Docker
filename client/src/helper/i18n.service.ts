import i18n from '@/i18n';

export function changeLanguage(lng: 'de' | 'en') {
  i18n.locale = lng;
}