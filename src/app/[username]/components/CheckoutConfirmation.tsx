import { OrderForm } from '@/@types/cart';
import Button from '@/components/Button';
import { CartContext, CartContextType } from '@/contexts/cart';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  order: OrderForm;
  visible: boolean;
  onDismiss: () => void;
};

export default function CheckoutConfirmation({
  visible,
  onDismiss,
  order,
}: Props) {
  const { checkout } = useContext(CartContext) as CartContextType;

  const [loading, setLoading] = useState<boolean>(false);

  const closeDialog = () => {
    if (!loading) {
      onDismiss();
    }
  };

  const onCheckout = async () => {
    setLoading(true);
    try {
      await checkout(order);
    } catch (error) {
      let message: string = 'Maaf, terjadi kesalahan. Pesanan gagal dibuat';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
      onDismiss();
    }
  };

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
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
                  Anda akan diarahkan ke WhatsApp untuk pemesanan
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Silahkan kirim rincian pesanan tanpa merubah isi pesan
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {!loading && (
                    <Button
                      label="Kembali"
                      type="button"
                      className="btn-transparent mr-3"
                      onClick={onDismiss}
                    />
                  )}
                  <Button
                    loading={loading}
                    label="Pesan Sekarang"
                    className="bg-red-100 text-red-600 ml-auto"
                    type="button"
                    onClick={onCheckout}
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
