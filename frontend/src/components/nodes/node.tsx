import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function WorkflowNode({ data }: { data: HazlerNode }) {
  return (
    <>
      <Handle type="target" position={Position.Bottom} />
      <Card className="p-2">
        <CardTitle className="flex items-center justify-between p-3">
          <p>{data.type}</p>
          <Sheet key="bottom">
            <SheetTrigger asChild>
              <Button outline>Edit</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </CardTitle>
        <CardContent>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </CardContent>
      </Card>
    </>
  );
}
