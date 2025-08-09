class DashboardPagesConfig {
	
	DASHBOARD = '/dashboard';

	TASK(id: string){
		return `${this.DASHBOARD}/task/${id}`
	}
	TASK_EDIT(id: string) {
		return `${this.DASHBOARD}/task/${id}/edit-task`;
	}
	ADD_TASK = `${this.DASHBOARD}/task/add-task`;

	ADD_SUBTASK(id: string) {
		return `${this.DASHBOARD}/task/${id}/add-sub-task`;
	}
	MESSAGES = `${this.DASHBOARD}/messages`;
	TEAM = `${this.DASHBOARD}/team`;
	INSIGHT = `${this.DASHBOARD}/insight`;
	SCHEDULE = `${this.DASHBOARD}/schedule`;
	REPORT = `${this.DASHBOARD}/report`;
	SETTINGS = `${this.DASHBOARD}/settings`;

}

export const DASHBOARD_PAGES = new DashboardPagesConfig();
