class PagesConfig {
	HOME = '/';
	DASHBOARD = '/dashboard';
	TASK_EDIT(id: string) {
		return `${this.DASHBOARD}/task/${id}/edit`;
	}

	MESSAGES = '/messages';
	TEAM = '/team';
	INSIGHT = '/insight';
	SCHEDULE = '/schedule';
	REPORT = '/report';
	SETTINGS = '/settings';
}

export const PAGE = new PagesConfig();
