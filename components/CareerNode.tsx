import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

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
  );
}

export default memo(CareerNode);
