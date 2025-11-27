class GuardPagesConfig {
	
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
	MESSAGES = `/messages`;
	TEAM = `/team`;
	// INSIGHT = `/insight`;
	SCHEDULE = `/schedule`;
	NOTIFICATION = `/notification`;
	SETTINGS = `/settings`;

}

export const GUARD_PAGES = new GuardPagesConfig();
