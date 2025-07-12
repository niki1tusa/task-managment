class DashboardPagesConfig {
	
	DASHBOARD = '/dashboard';
	TASK_EDIT(id: string) {
		return `${this.DASHBOARD}/task/${id}/edit`;
	}
	ADD_TASK = `${this.DASHBOARD}/task/add-task`;

	ADD_SUBTASK(id: string) {
		return `${this.DASHBOARD}/task/${id}/add-sub-task`;
	}
	MESSAGES = '/messages';
	TEAM = '/team';
	INSIGHT = '/insight';
	SCHEDULE = '/schedule';
	REPORT = '/report';
	SETTINGS = '/settings';

}

export const DASHBOARD_PAGES = new DashboardPagesConfig();
