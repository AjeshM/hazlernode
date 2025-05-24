export interface HazlerNode {
  name: number;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
  docstatus: 0 | 1 | 2;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  idx?: number;
  /**	Type : Link - Hazler Node Type	*/
  type: string;
  /**	Kind : Select	*/
  kind?: string;
  /**	Event : Link - Hazler Node Event Type	*/
  event?: string;
  /**	Parameters : JSON	*/
  parameters?: any;
}
