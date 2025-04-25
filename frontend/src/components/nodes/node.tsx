import {
  Handle,
  NodeProps,
  Position,
  Node,
  useOnSelectionChange,
} from '@xyflow/react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function WorkflowNode({
  data,
  selected,
}: NodeProps<Node<HazlerNode>>) {
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      for (const node of nodes) {
        if (node.id === String(data.name)) {
          // do something when a node is selected
        }
      }
    },
  });
  return (
    <>
      <Card
        className={selected ? 'border-2 border-lime-400/80' : ''}
        style={{ minWidth: '24rem' }}
      >
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
          <Button
            plain
            onClick={() => {
              // do something on edit click
            }}
          >
            <PencilIcon size={16} />
          </Button>
        </CardHeader>
        {/* {selected && (
          <CardContent>
          </CardContent>
        )} */}
      </Card>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </>
  );
}
