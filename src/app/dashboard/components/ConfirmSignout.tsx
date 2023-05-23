import Button from '@/components/Button';
import { AuthContext, AuthContextType } from '@/contexts/auth';
import { signOut } from '@/firebase/auth';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function ConfirmSignout({ visible, onDismiss }: Props) {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [loading, setLoading] = useState<boolean>(false);

  const closeSignoutDialog = () => {
    if (!loading) {
      onDismiss();
    }
  };

  const onSignout = async () => {
    if (user) {
      setLoading(true);
      signOut(user.uid);
    }
  };

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeSignoutDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Apakah Anda Ingin Keluar?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Anda bisa masuk ke akun Anda kembali nanti
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-end">
                  {!loading && (
                    <Button
                      label="Tidak"
                      type="button"
                      className="btn-transparent mr-3"
                      onClick={onDismiss}
                    />
                  )}
                  <Button
                    loading={loading}
                    label="Keluar"
                    className="bg-red-100 text-red-600"
                    type="button"
                    danger
                    onClick={onSignout}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
