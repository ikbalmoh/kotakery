import { classNames } from '@/utils/helpers';
import { CheckIcon } from '@heroicons/react/20/solid';
import React from 'react';

type Props = {
  active: number;
  steps: Array<{
    step: number;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'>
    >;
    title: string;
  }>;
};

export default function StepWizard({ steps, active }: Props) {
  return (
    <div className="w-full relative">
      <div className="h-0.5 bg-slate-200/60 w-full absolute top-9 left-0 right-0 z-0 rounded-full"></div>
      <div
        className="h-0.5 bg-red-500 absolute top-9 left-0 right-0 z-0 rounded-full"
        style={{ width: (active / steps.length) * 80 + '%' }}
      ></div>
      <div className="flex items-center justify-evenly py-3">
        {steps.map((w) => (
          <div key={w.step} className="flex flex-col items-center z-10">
            <div
              className={classNames(
                'w-12 h-12 rounded-full border-2 mb-3 flex items-center justify-center',
                w.step === active
                  ? 'bg-red-500 border-red-500'
                  : active > w.step
                  ? 'border-red-500 bg-white'
                  : 'border-slate-200 bg-white'
              )}
            >
              {active > w.step ? (
                <CheckIcon className="w-7 h-7 text-red-500" />
              ) : (
                <w.icon
                  className={classNames(
                    'h-7 w-7',
                    w.step === active ? 'text-white' : 'text-slate-400'
                  )}
                />
              )}
            </div>
            <div
              className={classNames(
                'text-xs select-none',
                active >= w.step
                  ? 'text-red-500 font-semibold'
                  : 'text-slate-500 font-medium'
              )}
            >
              {w.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
