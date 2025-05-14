export {};

import type { HazlerWorkflow as DocTypeWorkflow } from '@/types/Hazlernode/HazlerWorkflow';
import type { HazlerNode as DocTypeHazlerNode } from '@/types/Hazlernode/HazlerNode';
import type { HazlerWorkflowExecutionLog as DocTypeHazlerWorkflowExecutionLog } from '@/types/Hazlernode/HazlerWorkflowExecutionLog';
import type { HazlerNodeType as DocTypeHazlerNodeType } from '@/types/Hazlernode/HazlerNodeType';
import type { HazlerNodeEventType as DocTypeHazlerNodeEventType } from '@/types/Hazlernode/HazlerNodeEventType';
import type { HazlerEventParam as DocTypeHazlerEventParam } from '@/types/Hazlernode/HazlerEventParam';

declare global {
  type HazlerWorkflow = DocTypeWorkflow;
  type HazlerNode = DocTypeHazlerNode;
  type HazlerWorkflowExecutionLog = DocTypeHazlerWorkflowExecutionLog;
  type HazlerNodeType = DocTypeHazlerNodeType;
  type HazlerNodeEventType = DocTypeHazlerNodeEventType;
  type HazlerEventParam = DocTypeHazlerEventParam;
  interface Window {
    csrf_token: string;
  }
}
