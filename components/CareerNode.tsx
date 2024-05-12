import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type CareerNodeProps = {
  jobTitle?: string;
  jobDescription?: string;
  timeline?: string;
  salary?: string;
  difficulty?: string;
  connectPosition?: string;
  label?: string;
};

function CareerNode({ data }: NodeProps<CareerNodeProps>) {
  const {
    jobTitle,
    jobDescription,
    timeline,
    salary,
    difficulty,
    connectPosition,
  } = data;
  const position = connectPosition === 'top' ? Position.Top : Position.Bottom;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='border border-gray-300 rounded-2xl py-4 px-7 max-w-[350px] bg-gray-50'>
          <Handle type='target' position={position} />
          <h1 className='text-2xl font-bold mb-2'>{jobTitle}</h1>
          <p className='mb-4 font-light'>{jobDescription}</p>
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
              <div className='font-light'>TIMELINE:</div>
              <div className='font-medium text-lg'>{timeline}</div>
            </div>
            <div className='flex justify-between'>
              <div className='font-light'>SALARY:</div>
              <div className='font-medium text-lg'>{salary}</div>
            </div>
            <div className='flex justify-between'>
              <div className='font-light'>DIFFICULTY:</div>
              <div
                className={`font-semibold ${
                  difficulty?.toLowerCase() == 'low'
                    ? 'text-green-600'
                    : difficulty?.toLowerCase() == 'high'
                    ? 'text-red-600'
                    : 'text-orange-600'
                } text-lg`}
              >
                {difficulty}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-5xl'>
        <DialogHeader>
          <DialogTitle className='flex justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>SEO Specialist</span>
              <span className='border rounded-3xl border-gray-200 px-3 py-1 text-sm'>
                1 - 3 months
              </span>
              <span className='border rounded-3xl border-gray-200 px-3 py-1 text-sm'>
                $59k - 81k
              </span>
              <span className='border rounded-3xl border-gray-200 px-3 py-1 text-sm text-green-600'>
                Low
              </span>
            </div>
            <div className='flex items-center gap-3 mr-5'>
              <div className='font-bold'>Work Required:</div>
              <span className='border rounded-3xl border-gray-200 px-3 py-1 text-sm'>
                10-20 hrs/week
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='flex gap-7'>
          <div className='flex flex-col gap-4 w-1/2'>
            <div>
              <h2 className='text-lg font-semibold mb-2'>
                What's an SEO specialist?
              </h2>
              <p>
                SEO Specialists optimize websites to rank higher in search
                engine results, aiming to increase online visibility, drive
                organic traffic, and improve user engagement. They conduct
                keyword research, analyze competitors, and implement SEO
                strategies that include on-page optimization, link building, and
                content creation.
              </p>
            </div>
            <div>
              <h2 className='text-lg font-semibold mb-2'>
                Why it's a good fit
              </h2>
              <ul className='list-disc'>
                <li>Creativity: Possess creative capabilities,</li>
                <li>Creativity: Possess creative capabilities,</li>
                <li>Creativity: Possess creative capabilities,</li>
              </ul>
            </div>
          </div>
          <div className='w-1/2'>
            <h2 className='text-lg font-semibold mb-2'>Roadmap</h2>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <div className='font-light'>Weeks 1-4:</div>
                <div>
                  Prepare your resume and start applying for SEO Specialist
                  positions. Leverage your portfolio to showcase your expertise.
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='font-light'>Weeks 1-4:</div>
                <div>
                  Prepare your resume and start applying for SEO Specialist
                  positions. Leverage your portfolio to showcase your expertise.
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='font-light'>Weeks 1-4:</div>
                <div>
                  Prepare your resume and start applying for SEO Specialist
                  positions. Leverage your portfolio to showcase your expertise.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default memo(CareerNode);
