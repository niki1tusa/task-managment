import type { Metadata } from 'next';
import SettingsClientPage from './SettingsPage';


export const metadata: Metadata = {
	title: 'Settings',
};


export default async function SettingsPage() {
return <SettingsClientPage/>
}
