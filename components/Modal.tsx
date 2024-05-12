import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function Modal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Trigger Modal</Button>
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
