
export interface HazlerWebhookLog{
	name: number
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Webhook : Link - Hazler Webhook Listener	*/
	webhook: string
	/**	Response Status : Select	*/
	response_status?: "Success" | "Failed"
	/**	Context : Code	*/
	context?: string
}