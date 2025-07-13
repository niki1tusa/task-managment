import { create } from 'zustand';

import { LIST_CARD } from '@/shared/data/list.card.data';
import { MENU } from '@/shared/data/menu.data';
import { PROFILES } from '@/shared/data/profile.data';
import { PROJECTS_MENU } from '@/shared/data/projects.menu.data';
import type { ICard } from '@/shared/types/card.types';
import type { IMenuItem } from '@/shared/types/menu.item.types';
import type { IProfile } from '@/shared/types/profile.types';
import type { IProjectsMenu } from '@/shared/types/projects.menu.types';

export interface IGlobalStore {
	profiles: IProfile[];
	cards: ICard[];
	menus: IMenuItem[];
	projectMenus: IProjectsMenu[];
}
// Глобальное хранилище UI-данных: профили, карточки, меню (sidebar).
export const useGlobalStore = create<IGlobalStore>()((set, get) => ({
	cards: LIST_CARD,
	profiles: PROFILES,
	menus: MENU,
	projectMenus: PROJECTS_MENU,
}));
