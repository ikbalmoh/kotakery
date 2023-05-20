import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export default function Cart({ isOpen, onDismiss }: Props) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onDismiss} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-100 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-100 translate-x-full"
        >
          <div className="fixed inset-0 flex items-end justify-end">
            <Dialog.Panel className="w-full md:max-w-md h-screen bg-slate-50">
              <Dialog.Title
                as="div"
                className="flex items-center px-5 h-16 border-b border-slate-200/60 shadow-md bg-white"
              >
                <button
                  type="button"
                  className="mr-3 rounded-full"
                  onClick={onDismiss}
                >
                  <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
                </button>
                <h3 className="text-base font-medium leading-6 text-slate-800">
                  Keranjang Belanja
                </h3>
              </Dialog.Title>

              {/* ... */}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
