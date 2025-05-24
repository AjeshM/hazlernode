import { HazlerNode } from './HazlerNode';

export interface HazlerWorkflow {
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
  /**	Enabled? : Check	*/
  enabled?: 0 | 1;
  /**	Title : Data	*/
  title: string;
  /**	Trigger Type : Link - Hazler Node Type	*/
  trigger_type?: string;
  /**	Trigger Config : JSON	*/
  trigger_config?: any;
  /**	Nodes : Table - Hazler Node	*/
  nodes?: HazlerNode[];
}
