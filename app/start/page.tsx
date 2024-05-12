'use client';

import CareerNode from '@/components/CareerNode';
import { uploaderOptions } from '@/lib/utils';
import { UrlBuilder } from '@bytescale/sdk';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Node, NodeTypes } from 'reactflow';

const nodeTypes = {
  careerNode: CareerNode,
} satisfies NodeTypes;

const connectionLineStyle = { stroke: '#000' };

const initialNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 500, y: 250 },
    data: { label: 'Careers' },
  },
  {
    id: '2',
    type: 'careerNode',
    position: { x: 100, y: 350 },
    data: {
      jobTitle: 'Data Analyst',
      jobDescription:
        'Coordinates product development to align with market needs.',
      timeline: '2-3 months',
      salary: '$59k - $77k',
      difficulty: 'Low',
      connectPosition: 'top',
    },
  },
  {
    id: '3',
    type: 'careerNode',
    position: { x: 700, y: 350 },
    data: {
      jobTitle: 'Data Analyst',
      jobDescription:
        'Coordinates product development to align with market needs.',
      timeline: '2-3 months',
      salary: '$59k - $77k',
      difficulty: 'Low',
      connectPosition: 'top',
    },
  },
  {
    id: '4',
    type: 'careerNode',
    position: { x: 100, y: 50 },
    data: {
      jobTitle: 'Data Analyst',
      jobDescription:
        'Coordinates product development to align with market needs.',
      timeline: '2-3 months',
      salary: '$59k - $77k',
      difficulty: 'Low',
      connectPosition: 'bottom',
    },
  },
  {
    id: '5',
    type: 'careerNode',
    position: { x: 700, y: 50 },
    data: {
      jobTitle: 'Data Analyst',
      jobDescription:
        'Coordinates product development to align with market needs.',
      timeline: '2-3 months',
      salary: '$59k - $77k',
      difficulty: 'Low',
      connectPosition: 'bottom',
    },
  },
] satisfies Node[];

// const initialNodes = [
//   { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' } },
//   {
//     id: 'b',
//     type: 'careerNode',
//     position: { x: -100, y: 100 },
//     data: {
//       label: 'drag me!',
//       jobTitle: 'Data Analyst',
//       jobDescription:
//         'Coordinates product development to align with market needs.',
//       timeline: '2-3 months',
//       salary: '$59k - $77k',
//       difficulty: 'Low',
//       connectPosition: 'bottom',
//     },
//   },
//   { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
//   {
//     id: 'd',
//     type: 'output',
//     position: { x: 0, y: 200 },
//     data: { label: 'with React Flow' },
//   },
// ] satisfies Node[];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },
];

export default function Start() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [nodes, , onNodesChange] = useNodesState(initialNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [parsedResume, setParsedResume] = useState('');

  console.log({ name, url, parsedResume });

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  async function parsePdf() {
    let response = await fetch('/api/parsePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeUrl: url }),
    });
    let data = await response.json();
    setParsedResume(data.normalizedText);
  }

  return (
    <div className='p-10 mt-20 flex justify-center items-center flex-col '>
      {/* {parsedResume ? ( */}
      <div className='w-screen h-screen mx-auto'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          fitView
        >
          <Controls />
          <MiniMap />
          {/* <Background variant='dots' gap={12} size={1} /> */}
        </ReactFlow>
      </div>
      {/* ) : (
        <>
      <h1 className='text-center text-5xl mb-20 font-bold'>
        Upload your resume
      </h1>
      <UploadDropzone
          options={uploaderOptions}
          onUpdate={({ uploadedFiles }) => {
            if (uploadedFiles.length !== 0) {
              const file = uploadedFiles[0];
              const fileName = file.originalFile.file.name;
              const fileUrl = UrlBuilder.url({
                accountId: file.accountId,
                filePath: file.filePath,
              });
              setName(fileName);
              setUrl(fileUrl);
            }
          }}
          onComplete={parsePdf}
          width='670px'
          height='350px'
        />
        </>
      )} */}
    </div>
  );
}
