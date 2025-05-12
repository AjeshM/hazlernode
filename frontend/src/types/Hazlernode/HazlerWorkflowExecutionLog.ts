import { HazlerExecutionNodeLog } from './HazlerExecutionNodeLog'

export interface HazlerWorkflowExecutionLog{
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
	/**	Workflow : Link - Hazler Workflow	*/
	workflow: string
	/**	Workflow Title : Data	*/
	workflow_title?: string
	/**	Amended From : Link - Hazler Workflow Execution Log	*/
	amended_from?: string
	/**	Status : Select	*/
	status?: "Success" | "Failed" | "Running"
	/**	Traceback : Code	*/
	traceback?: string
	/**	Trigger Type : Data	*/
	trigger_type?: string
	/**	Trigger Config : Code	*/
	trigger_config?: string
	/**	Node Logs : Table - Hazler Execution Node Log	*/
	node_logs?: HazlerExecutionNodeLog[]
	/**	Initial Context : Code	*/
	initial_context?: string
}