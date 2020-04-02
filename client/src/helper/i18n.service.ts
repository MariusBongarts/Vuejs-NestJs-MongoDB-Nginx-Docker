import { Language } from './../models/Types';
import i18n from '@/i18n';

export function changeLanguage(lng: Language) {
  i18n.locale = lng;
}