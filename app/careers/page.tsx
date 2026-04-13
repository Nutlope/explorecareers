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
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Node, NodeTypes } from 'reactflow';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import LoadingDots from '@/components/ui/loadingdots';
import LoadingState from '@/components/ui/loading-state';
import { finalCareerInfo } from '@/lib/types';

const nodeTypes = {
  careerNode: CareerNode,
} satisfies NodeTypes;

function CareerGraph({ nodes, edges, onNodesChange, onEdgesChange, onConnect }: {
  nodes: Node[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: any;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.6, duration: 800 });
      }, 100);
    }
  }, [nodes, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.5, minZoom: 0.5, maxZoom: 1.5 }}
    >
      <Controls />
    </ReactFlow>
  );
}

export default function Start() {
  const [_, setName] = useState('');
  const [url, setUrl] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [careerInfo, setCareerInfo] = useState<finalCareerInfo[]>([]);
  const [additionalContext, setAdditionalContext] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (careerInfo.length === 0) return;

    const centerNode = {
      id: '1',
      position: { x: 650, y: 450 },
      data: { label: 'Careers' },
      style: { background: '#000', color: '#fff', fontSize: '20px' },
    };

    const positions = [
      { x: 50, y: 550, connectPosition: 'top' },
      { x: 1050, y: 550, connectPosition: 'top' },
      { x: 50, y: 150, connectPosition: 'bottom' },
      { x: 1050, y: 150, connectPosition: 'bottom' },
      { x: 550, y: 700, connectPosition: 'top' },
      { x: 550, y: 0, connectPosition: 'bottom' },
    ];

    const careerNodes = careerInfo.slice(0, 6).map((career, index) => ({
      id: String(index + 2),
      type: 'careerNode' as const,
      position: positions[index],
      data: {
        ...career,
        connectPosition: positions[index].connectPosition,
      },
    }));

    setNodes([centerNode, ...careerNodes]);

    const newEdges = careerNodes.map((node) => ({
      id: `e1-${node.id}`,
      source: '1',
      target: node.id,
      animated: true,
      style: { stroke: '#000' },
    }));

    setEdges(newEdges);
  }, [careerInfo]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const notify = () => toast.error('Failed to generate, please try again.');

  async function parsePdf() {
    setLoading(true);

    // First API call - parse PDF
    let response = await fetch('/api/parsePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeUrl: url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'Failed to parse PDF';
      const resetTime = new Date(errorData.reset);
      const minutesLeft = Math.max(1, Math.ceil((resetTime.getTime() - Date.now()) / 60000));
      toast.error(errorMessage + (response.status === 429 ? ` - Try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}` : ''));
      setLoading(false);
      return;
    }

    let data = await response.json();

    // Second API call - get careers
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
      const errorData = await response2.json();
      const errorMessage = errorData.error || 'Failed to generate';
      const resetTime2 = new Date(errorData.reset);
      const minutesLeft2 = Math.max(1, Math.ceil((resetTime2.getTime() - Date.now()) / 60000));
      toast.error(errorMessage + (response2.status === 429 ? ` - Try again in ${minutesLeft2} minute${minutesLeft2 !== 1 ? 's' : ''}` : ''));
      setLoading(false);
      return;
    }

    let data2 = await response2.json();

    if (data2.length === 0) {
      toast.error('No career paths could be generated. Please try again.');
      setLoading(false);
      return;
    }

    setCareerInfo(data2);
    setLoading(false);
  }

  return (
    <div>
      {careerInfo.length !== 0 ? (
        <div className='w-[98vw] h-[80vh] mx-auto'>
          <ReactFlowProvider>
            <CareerGraph
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            />
          </ReactFlowProvider>
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
          <div className={`relative w-full flex justify-center ${loading ? 'pointer-events-none opacity-60' : ''}`}>
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
          </div>
          <Textarea
            placeholder='Describe any of your career interests and passions. This will help us match you with the right job paths (optional).'
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className='mt-5 max-w-2xl text-base border border-gray-400 focus:border-black'
            rows={6}
            disabled={loading}
          />
          <Button
            onClick={parsePdf}
            className={`mt-10 text-base px-5 py-6 ${loading ? 'min-w-[230px]' : 'w-auto'}`}
            disabled={url ? false : true}
          >
            {loading ? (
              <LoadingState estimatedSeconds={20} />
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
