
export interface HazlerNode {
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
	/**	Position X : Float	*/
	position_x: number
	/**	Position Y : Float	*/
	position_y: number
	/**	Type : Link - Hazler Node Type	*/
	type: string
}