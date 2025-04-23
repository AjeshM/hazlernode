import { useCallback } from 'react';
import { Handle, NodeProps, Position, Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { useSheet } from '@/hooks/node-sheets';
import { Badge } from '@/components/ui/badge';

export default function WorkflowNode({
  data,
  selected,
}: NodeProps<Node<HazlerNode>>) {
  const { setOpen } = useSheet();
  return (
    <>
      <Handle type="target" position={Position.Bottom} />
      <Card className={selected ? 'border-2 border-lime-400/80' : ''}>
        <CardHeader className="flex items-center justify-between p-3">
          <CardTitle>
            {data.type}
            <Badge
              className="ml-2"
              color={data.kind == 'Trigger' ? 'lime' : 'zinc'}
            >
              {data.kind}
            </Badge>
          </CardTitle>
          <Button plain onClick={() => setOpen(true)}>
            <PencilIcon size={16} />
          </Button>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </CardContent>
      </Card>
    </>
  );
}
