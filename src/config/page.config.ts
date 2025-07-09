class PagesConfig {
	HOME = '/';
	DASHBOARD = '/dashboard';
	TASK_EDIT(id: string) {
		return `${this.DASHBOARD}/task/${id}/edit`;
	}
	ADD_SUBTASK(id: string) {
		return `${this.DASHBOARD}/task/${id}/add-sub-task`;
	}
	MESSAGES = '/messages';
	TEAM = '/team';
	INSIGHT = '/insight';
	SCHEDULE = '/schedule';
	REPORT = '/report';
	SETTINGS = '/settings';
	LOGIN = '/auth/login';
}

export const PAGE = new PagesConfig();
