export { };

import type { HazlerWorkflow as DocTypeWorkflow } from '@/types/Hazlernode/HazlerWorkflow';
import type { HazlerNode as DocTypeHazlerNode } from '@/types/Hazlernode/HazlerNode';
import type { HazlerWorkflowExecutionLog as DocTypeHazlerWorkflowExecutionLog } from '@/types/Hazlernode/HazlerWorkflowExecutionLog';
import type { HazlerNodeType as DocTypeHazlerNodeType } from '@/types/Hazlernode/HazlerNodeType';

declare global {
  type HazlerWorkflow = DocTypeWorkflow;
  type HazlerNode = DocTypeHazlerNode;
  type HazlerWorkflowExecutionLog = DocTypeHazlerWorkflowExecutionLog;
  type HazlerNodeType = DocTypeHazlerNodeType;
}