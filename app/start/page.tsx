'use client';

import CareerNode from '@/components/CareerNode';
import { uploaderOptions } from '@/lib/utils';
import { UrlBuilder } from '@bytescale/sdk';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Node, NodeTypes } from 'reactflow';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const nodeTypes = {
  careerNode: CareerNode,
} satisfies NodeTypes;

const initialNodes = [
  {
    id: '1',
    position: { x: 650, y: 450 },
    data: { label: 'Careers' },
    style: { background: '#000', color: '#fff', fontSize: '20px' },
  },
  {
    id: '2',
    type: 'careerNode',
    position: { x: 50, y: 550 },
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
    position: { x: 1050, y: 550 },
    data: {
      jobTitle: 'UX Designer',
      jobDescription:
        'Creates user-centered design solutions to improve product usability and user experience.',
      timeline: '3-6 months',
      salary: '$85k - $110k',
      difficulty: 'Medium',
      connectPosition: 'top',
    },
  },
  {
    id: '4',
    type: 'careerNode',
    position: { x: 50, y: 150 },
    data: {
      jobTitle: 'Digital Marketing Specialist',
      jobDescription:
        'Develops online marketing campaigns to drive business growth.',
      timeline: '2-4 months',
      salary: '$50k - $70k',
      difficulty: 'Low',
      connectPosition: 'bottom',
    },
  },
  {
    id: '5',
    type: 'careerNode',
    position: { x: 1050, y: 150 },
    data: {
      jobTitle: 'Software Engineer',
      jobDescription:
        'Designs, develops, and tests software applications to meet business needs.',
      timeline: '6-12 months',
      salary: '$100k - $140k',
      difficulty: 'High',
      connectPosition: 'bottom',
    },
  },
  {
    id: '6',
    type: 'careerNode',
    position: { x: 550, y: 700 },
    data: {
      jobTitle: 'Cybersecurity Specialist',
      jobDescription:
        'Protects computer systems and networks from cyber threats by developing and implementing security protocols.',
      timeline: '6-12 months',
      salary: '$80k - $120k',
      difficulty: 'High',
      connectPosition: 'top',
    },
  },
  {
    id: '7',
    type: 'careerNode',
    position: { x: 550, y: 0 },
    data: {
      jobTitle: 'Business Analyst',
      jobDescription:
        'Analyzes business needs and develops solutions to improve operations and processes.',
      timeline: '3-6 months',
      salary: '$65k - $90k',
      difficulty: 'Medium',
      connectPosition: 'bottom',
    },
  },
] satisfies Node[];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#000' },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#000' },
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    animated: true,
    style: { stroke: '#000' },
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    animated: true,
    style: { stroke: '#000' },
  },
  {
    id: 'e1-6',
    source: '1',
    target: '6',
    animated: true,
    style: { stroke: '#000' },
  },
  {
    id: 'e1-7',
    source: '1',
    target: '7',
    animated: true,
    style: { stroke: '#000' },
  },
];

export default function Start() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [parsedResume, setParsedResume] = useState('');
  const [careerInfo, setCareerInfo] = useState([]);
  const [additionalContext, setAdditionalContext] = useState('');

  useEffect(() => {
    console.log('parsedResume', parsedResume);
    console.log('careerInfo', careerInfo);
  }, [parsedResume, careerInfo]);

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

    let response2 = await fetch('/api/getCareers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeInfo: data.normalizedText }),
    });
    let data2 = await response2.json();
    setCareerInfo(data2.careers);
  }

  return (
    <div>
      {parsedResume ? (
        <div className='w-screen h-[1200px] mx-auto'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
      ) : (
        <div className='p-10 mt-20 flex justify-center items-center flex-col '>
          <h1 className='text-center text-5xl mb-5 font-bold'>
            Upload your resume
          </h1>
          <p className='mb-8 text-center text-gray-600'>
            Upload your resume to get started. We'll analyze your resume and
            provide you with a personalized career path.
          </p>
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
            width='695px'
            height='350px'
          />
          {/* Textarea for providing context */}
          <Textarea
            placeholder='Describe more about your career goals, interests, and passions. This will help us match you with the right job paths.'
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className='mt-5 max-w-2xl text-base'
            rows={6}
          />
          <Button
            onClick={() => console.log('button clicked')}
            className='mt-10 text-base px-5 py-7'
          >
            Find your ideal career
          </Button>
        </div>
      )}
    </div>
  );
}
