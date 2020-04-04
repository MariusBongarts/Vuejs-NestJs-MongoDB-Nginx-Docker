export interface SettingsItem {
  component: 'language' | 'password';
  title: string;
  hasFooter: boolean;
  icon: string;
  successMsg: string;
}