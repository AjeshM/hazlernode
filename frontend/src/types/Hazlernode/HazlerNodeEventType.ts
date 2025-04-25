import { HazlerEventParam } from './HazlerEventParam'

export interface HazlerNodeEventType{
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
	/**	Title : Data	*/
	title: string
	/**	Node Type : Link - Hazler Node Type	*/
	node_type: string
	/**	Params : Table - Hazler Event Param	*/
	params?: HazlerEventParam[]
}