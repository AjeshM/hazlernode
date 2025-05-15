import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { DocTypeQueryParams, useDocType } from '@/queries/frappe';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

export default function AddNewNode() {
  const [showDialog, setShowDialog] = useState(false);
  const { useList } = useDocType<HazlerNodeType>('Hazler Node Type');
  const { useSetValueMutation } = useDocType<HazlerWorkflow>('Hazler Workflow');

  const setValue = useSetValueMutation();
  function setTrigger(trigger: HazlerNodeType) {
    setValue.mutate(
      {
        name: '16',
        values: {
          trigger_type: trigger.name,
        },
      },
      {
        onSuccess: () => {
          setShowDialog(false);
          toast.success('Trigger Set!');
        },
      },
    );
  }
  const triggerListParams: DocTypeQueryParams<HazlerNodeType> = {
    filters: {
      kind: 'Trigger',
    },
  };
  const triggerNodeList = useList(triggerListParams);

  if (triggerNodeList.isLoading) return <Skeleton></Skeleton>;
  if (triggerNodeList.isError)
    return <div>Error occur during loading triggers</div>;

  return (
    <>
      <Button
        color="lime"
        className="cursor-default"
        onClick={() => setShowDialog(true)}
      >
        <div className="grid place-content-center py-2">
          <span>@ Set a trigger</span>
        </div>
      </Button>
      {/* <Handle type="target" position={Position.Top} /> */}
      <Dialog open={showDialog} onClose={setShowDialog} size="3xl">
        <DialogTitle>Select a trigger</DialogTitle>
        <DialogDescription>
          The event that will trigger a run of this workflow
        </DialogDescription>
        <DialogBody>
          <ol>
            {triggerNodeList.data?.map((trigger) => (
              <li key={trigger.name}>
                <Button onClick={() => setTrigger(trigger)} color="fuchsia">
                  {trigger.name}
                </Button>
              </li>
            ))}
          </ol>
        </DialogBody>
      </Dialog>
    </>
  );
}
