import Button from '@/components/Button';
import { classNames } from '@/utils/helpers';
import { Dialog, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import * as yup from 'yup';
import Cleave from 'cleave.js/react';
import SelectUnit from './SelectUnit';
import { storeProduct, updateProduct } from '@/firebase/db/product';
import Product from '@/@types/product';
import toast from 'react-hot-toast';
import SelectCategory from './SelectCategory';
import { PhotoIcon } from '@heroicons/react/24/outline';
import ImagePicker from '@/components/ImagePicker';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  initialValues?: Product;
};

export default function AddProductDialog({
  visible,
  onDismiss,
  initialValues,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          image: undefined,
          name: '',
          categoryId: '',
          description: '',
          price: undefined,
          unit: '',
        },
    validationSchema: yup.object({
      image: yup.mixed(),
      name: yup.string().required('isi nama produk'),
      categoryId: yup.string().required('pilih etalase'),
      price: yup
        .number()
        .min(0, 'tidak boleh minus')
        .required('harga belum diisi'),
      unit: yup.string().required('isi satuan'),
      description: yup.string().nullable(),
    }),
    onSubmit: (values) => {
      const product: Product = {
        image: values.image,
        name: values.name,
        price: values.price ?? 0,
        description: values.description,
        unit: values.unit,
        categoryId: values.categoryId,
      };
      submitProduct(product);
    },
  });

  useEffect(() => {
    form.resetForm();

    if (initialValues) {
      form.setValues(initialValues);
    } else {
      form.setValues({
        image: undefined,
        name: '',
        categoryId: '',
        description: '',
        price: undefined,
        unit: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, initialValues]);

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
      if (initialValues) {
        await updateProduct(initialValues.id!, product);
        toast.success('Produk berhasil diperbaharui');
      } else {
        await storeProduct(product);
        toast.success('Produk berhasil disimpan');
      }
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error(error);

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
                    {initialValues !== undefined ? 'Edit' : 'Tambah'} Produk
                  </Dialog.Title>
                  <div className="mt-5 grid grid-cols-12 gap-3">
                    <div className="col-span-12 flex flex-col">
                      <label htmlFor="image" className="form-label intro-y">
                        Foto Produk
                      </label>
                      <ImagePicker
                        onChange={(file) => form.setFieldValue('image', file)}
                        image={form.values.image}
                      />
                      <span className="mt-2 text-xs text-red-500 intro-y">
                        {form.touched.image ? form.errors.image : ''}
                      </span>
                    </div>
                    <div className="col-span-12 flex flex-col">
                      <label htmlFor="name" className="form-label intro-y">
                        Etalase Produk
                      </label>
                      <SelectCategory
                        error={
                          form.touched.categoryId &&
                          form.errors.categoryId != undefined
                        }
                        allowAdd
                        value={form.values.categoryId}
                        onChange={(value) =>
                          form.setFieldValue('categoryId', value)
                        }
                        nullable={false}
                      />
                      <span className="mt-2 text-xs text-red-500 intro-y">
                        {form.touched.categoryId ? form.errors.categoryId : ''}
                      </span>
                    </div>
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
                    <Button
                      loading={loading}
                      label={
                        initialValues == undefined ? 'Simpan' : 'Perbaharui'
                      }
                      type="submit"
                    />
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
