import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import { MerchantData } from '@/@types/account';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.id';
import { isUsernameAvailable } from '@/firebase/db/account';
import Button from '@/components/Button';

type Props = {
  onSubmit: (values: MerchantData) => void;
  initialValues?: MerchantData;
};

export default function MerchantForm({ onSubmit, initialValues }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: MerchantData) => {
    setLoading(true);
    onSubmit(values);
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          username: '',
          address: '',
          phone: '',
        },
    validationSchema: yup.object().shape({
      name: yup.string().required('isi nama toko'),
      username: yup
        .string()
        .required('tidak boleh kosong')
        .matches(
          /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
          'hanya huruf dan angka'
        )
        .test({
          name: 'unique-username',
          test: async (value, ctx) => {
            if (!value) {
              return ctx.createError({ message: 'buat username' });
            }
            const available: boolean = await isUsernameAvailable(value);
            if (!available) {
              return ctx.createError({ message: 'username tidak tersedia' });
            }
            return true;
          },
        }),
      address: yup.string().required('isi alamat toko'),
      phone: yup.string().test({
        name: 'phone',
        test: (value, ctx) => {
          if (!value || value == '+62') {
            return ctx.createError({ message: 'masukkan nomor whatsapp' });
          }
          if (value.length < 11) {
            return ctx.createError({ message: 'nomor tidak valid' });
          }
          return true;
        },
      }),
    }),
    onSubmit: handleSubmit,
  });

  const generateUsername = (name: string) => {
    const username: string = name
      .toLowerCase()
      .trim()
      .replaceAll(' ', '')
      .replace(/[^a-zA-Z0-9]/g, '');
    form.setFieldValue('username', username);
  };

  return (
    <form onSubmit={form.handleSubmit} className="intro-y">
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="form-label intro-y">
          Nama Toko <span>*</span>
        </label>

        <input
          type="text"
          className={classNames(
            'form-input intro-y',
            form.touched.name && form.errors.name ? 'error' : ''
          )}
          name="name"
          onChange={(e) => {
            form.handleChange(e);
            generateUsername(e.target.value);
          }}
          onBlur={form.handleBlur}
          value={form.values.name}
        />
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.name ? form.errors.name : ''}
        </span>
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="form-label intro-y">
          Username <span>*</span>
        </label>
        <div
          className={classNames(
            'input-group intro-y',
            form.touched.username && form.errors.username ? 'error' : ''
          )}
        >
          <span className="input-prefix">@</span>
          <input
            type="text"
            className={`form-input ${form.errors.username ? 'error' : ''}`}
            name="username"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.username}
            placeholder="namatoko"
          />
        </div>
        {form.touched.username && form.errors.username ? (
          <span className="mt-2 text-xs text-red-500 intro-y">
            {form.touched.username ? form.errors.username : ''}
          </span>
        ) : (
          <div className="mt-2 text-xs intro-y text-slate-500">
            <span className="font-semibold">kotakery.com/</span>
            <span className="">{form.values.username}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="form-label intro-y">
          Alamat <span>*</span>
        </label>
        <textarea
          className={classNames(
            'form-input intro-y',
            form.touched.address && form.errors.address ? 'error' : ''
          )}
          name="address"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.address}
          placeholder="Alamat lengkap"
        ></textarea>
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.address ? form.errors.address : ''}
        </span>
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="form-label intro-y">
          Nomor Whatsapp <span>*</span>
        </label>
        <span className="text-xs text-slate-500 intro-y mb-3">
          Untuk menerima pesanan dari pelanggan
        </span>
        <Cleave
          type="tel"
          options={{
            phone: true,
            phoneRegionCode: 'ID',
            prefix: '+62',
            tailPrefix: true,
            rawValueTrimPrefix: false,
          }}
          className={classNames(
            'form-input intro-y',
            form.touched.phone && form.errors.phone ? 'error' : ''
          )}
          onChange={form.handleChange}
          name="phone"
          onBlur={form.handleBlur}
          value={form.values.phone}
        />
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.phone ? form.errors.phone : ''}
        </span>
      </div>
      <div className="flex justify-end mt-8 ">
        <Button loading={loading} label="Selanjutnya" type="submit" />
      </div>
    </form>
  );
}
