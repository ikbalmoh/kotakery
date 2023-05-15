import Button from '@/components/Button';
import { classNames } from '@/utils/helpers';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import Cleave from 'cleave.js/react';
import SelectUnit from './SelectUnit';
import { storeProduct } from '@/firebase/db';
import Product from '@/@types/product';
import toast from 'react-hot-toast';

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function AddProductDialog({ visible, onDismiss }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: undefined,
      unit: 'item',
    },
    validationSchema: yup.object({
      name: yup.string().required('isi nama produk'),
      price: yup
        .number()
        .min(0, 'tidak boleh minus')
        .required('harga belum diisi'),
      unit: yup.string().required('isi satuan'),
      description: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      const product: Product = {
        name: values.name,
        price: values.price ?? 0,
        description: values.description,
        unit: values.unit,
      };
      submitProduct(product);
    },
  });

  const onClose = () => {
    if (loading) {
      return;
    }
    onDismiss();
    form.resetForm();
    setLoading(false);
  };

  const submitProduct = async (product: Product) => {
    setLoading(true);
    try {
      await storeProduct(product);
      setLoading(false);
      onClose();
      toast.success('Produk berhasil disimpan');
    } catch (error) {
      toast.error('Produk gagal disimpan');
    }
  };

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <form onSubmit={form.handleSubmit}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Tambah Produk
                  </Dialog.Title>
                  <div className="mt-5 grid grid-cols-12 gap-3">
                    <div className="col-span-12 flex flex-col">
                      <label htmlFor="name" className="form-label intro-y">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        className={classNames(
                          `form-input intro-y`,
                          form.touched.name && form.errors.name ? 'error' : ''
                        )}
                        name="name"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={form.values.name}
                      />
                      <span className="mt-2 text-xs text-red-500 intro-y">
                        {form.touched.name ? form.errors.name : ''}
                      </span>
                    </div>
                    <div className="col-span-8 flex flex-col">
                      <label htmlFor="name" className="form-label intro-y">
                        Harga
                      </label>
                      <Cleave
                        options={{
                          numeral: true,
                          numeralPositiveOnly: true,
                          numeralDecimalMark: ',',
                          delimiter: '.',
                        }}
                        className={classNames(
                          `form-input intro-y`,
                          form.touched.price && form.errors.price ? 'error' : ''
                        )}
                        name="price"
                        onChange={(e) =>
                          form.setFieldValue(
                            'price',
                            e.target.rawValue
                              ? parseFloat(e.target.rawValue)
                              : e.target.rawValue
                          )
                        }
                        onBlur={form.handleBlur}
                        value={form.values.price}
                      />
                      <span className="mt-2 text-xs text-red-500 intro-y">
                        {form.touched.price ? form.errors.price : ''}
                      </span>
                    </div>
                    <div className="col-span-4 flex flex-col">
                      <label htmlFor="unit" className="form-label">
                        Satuan
                      </label>
                      <SelectUnit
                        error={
                          form.touched.unit && form.errors.unit != undefined
                        }
                        value={form.values.unit}
                        onChange={(value) => form.setFieldValue('unit', value)}
                      />
                      <span className="mt-2 text-xs text-red-500 intro-y">
                        {form.touched.unit ? form.errors.unit : ''}
                      </span>
                    </div>
                    <div className="col-span-12 flex flex-col">
                      <label
                        htmlFor="description"
                        className="form-label intro-y"
                      >
                        Deskripsi Produk (opsional)
                      </label>
                      <textarea
                        className={classNames(
                          `form-input intro-y`,
                          form.touched.description && form.errors.description
                            ? 'error'
                            : ''
                        )}
                        name="description"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        value={form.values.description}
                      ></textarea>
                      <span className="mt-2 text-xs text-red-500 intro-y">
                        {form.touched.description
                          ? form.errors.description
                          : ''}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <Button
                      label="Batal"
                      type="button"
                      className="btn-transparent mr-3"
                      onClick={onClose}
                    />
                    <Button loading={loading} label="Simpan" type="submit" />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
