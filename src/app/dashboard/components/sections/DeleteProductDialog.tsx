import Product from '@/@types/product';
import Button from '@/components/Button';
import { deleteProduct } from '@/firebase/db/product';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  product: Product | undefined;
  onDismiss: () => void;
};

export default function DeleteProductDialog({ product, onDismiss }: Props) {
  const [deleting, setDeleting] = useState<boolean>(false);

  const onDeleteProduct = async () => {
    if (!product) {
      return;
    }
    setDeleting(true);
    try {
      await deleteProduct(product.id!);
      onDismiss();
      toast.success('Produk telah dihapus');
    } catch (error) {
      toast.error('Produk gagal dihapus');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Transition appear show={product !== undefined} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onDismiss}>
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
                  Hapus {product?.name}?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Produk yang sudah dihapus tidak dapat dikembalikan
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-end">
                  {!deleting && (
                    <Button
                      label="Tidak"
                      type="button"
                      className="btn-transparent mr-3"
                      onClick={onDismiss}
                    />
                  )}
                  <Button
                    loading={deleting}
                    label="Hapus"
                    className="btn-danger"
                    type="button"
                    onClick={onDeleteProduct}
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
