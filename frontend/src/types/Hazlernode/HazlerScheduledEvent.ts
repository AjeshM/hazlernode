
export interface HazlerScheduledEvent{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	CRON Expression : Data	*/
	cron_expression: string
	/**	Scheduled Job Type : Link - Scheduled Job Type	*/
	job_type?: string
}