import React, { useState } from 'react';
import { useDocType } from '@/queries/frappe';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './components/ui/button';

export default function App() {
  const { useList } = useDocType<HazlerWorkflow>('Hazler Workflow')
  const workflowList = useList({
    // fields: "*"
    fields: ['name', 'title', 'enabled']
  })
  if (workflowList.isLoading) {
    return <p>Loading workflow list....</p>
  }
  if (workflowList.isError) {
    return <p>Error loading workflows list...</p>
  }
  const workflows = workflowList.data
  return (
    <>
      <Card className='max-w-[40%]'>
        <CardHeader className='flex justify-between items-center'>
          <CardTitle>Your Workflow</CardTitle>
          <Button color='lime'> New Workflow</Button>
        </CardHeader>
        <CardContent><Table className='[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]'>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Enabled?</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((wf) => (
              <TableRow key={wf.name}>
                <TableCell className="font-medium">{wf.title}</TableCell>
                <TableCell>
                  <Switch checked={!!wf.enabled} color='lime' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table></CardContent>
      </Card>
    </>
  );
}
