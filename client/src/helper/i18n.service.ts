import { Language } from './../models/Types';
import i18n from '@/i18n';

export function changeLanguage(lng: Language) {
  localStorage.lng = lng;
  i18n.locale = lng;
}