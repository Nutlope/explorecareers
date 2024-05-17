'use client';

import toast, { Toaster } from 'react-hot-toast';
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
import LoadingDots from '@/components/ui/loadingdots';
import { finalCareerInfo } from '@/lib/types';

const nodeTypes = {
  careerNode: CareerNode,
} satisfies NodeTypes;

// TODO: Clean this up
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
      jobTitle: 'SEO Specialist',
      jobDescription: `Uses research to improve a website's ranking in search engine results`,
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
  const [_, setName] = useState('');
  const [url, setUrl] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [careerInfo, setCareerInfo] = useState<finalCareerInfo[]>([]);
  const [additionalContext, setAdditionalContext] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNodes((initialNodes) =>
      initialNodes.map((node) => {
        if (node.id === '1') {
          node.data = {
            label: 'Careers',
          };
        } else {
          let realdata = careerInfo[Number(node.id) - 2];

          if (node.id === '2' || node.id === '3' || node.id === '6') {
            // @ts-ignore
            node.data = { ...realdata, connectPosition: 'top' };
          } else {
            // @ts-ignore
            node.data = { ...realdata, connectPosition: 'bottom' };
          }
        }
        return node;
      })
    );
  }, [careerInfo]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const notify = () => toast.error('Failed to generate, please try again.');

  async function parsePdf() {
    setLoading(true);
    let response = await fetch('/api/parsePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeUrl: url }),
    });
    let data = await response.json();

    let response2 = await fetch('/api/getCareers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeInfo: data,
        context: additionalContext,
      }),
    });

    if (!response2.ok) {
      console.error('Failed to fetch');
      setLoading(false);
      notify();
      return;
    }

    let data2 = await response2.json();
    setCareerInfo(data2);
    setLoading(false);
  }

  return (
    <div>
      {careerInfo.length !== 0 ? (
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
        <div className='p-10 mt-16 flex justify-center items-center flex-col '>
          <h1 className='text-center text-5xl mb-5 font-bold'>
            Upload your resume
          </h1>
          <p className='mb-8 text-center text-gray-600 max-w-3xl'>
            Upload your resume to get started and add any extra context below.
            We'll analyze your resume along with the interests you provide and
            provide you with 6 personalized career paths for you.
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
            onComplete={() => console.log('upload complete')}
            width='695px'
            height='350px'
          />
          <Textarea
            placeholder='Describe any of your career interests and passions. This will help us match you with the right job paths (optional).'
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className='mt-5 max-w-2xl text-base border border-gray-400 focus:border-black'
            rows={6}
          />
          <Button
            onClick={parsePdf}
            className='mt-10 text-base px-5 py-7 w-60'
            disabled={url ? false : true}
          >
            {loading ? (
              <LoadingDots style='big' color='white' />
            ) : (
              'Find your ideal career'
            )}
          </Button>
        </div>
      )}
      <Toaster />
    </div>
  );
}
