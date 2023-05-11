import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import { merchantData } from '@/@types/account';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.id';

type Props = {
  onSubmit: (values: merchantData) => void;
  initialValues?: merchantData;
};

export default function MerchantForm({ onSubmit, initialValues }: Props) {
  const handleSubmit = (values: merchantData) => {
    // TODO verify username and phone
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
        ),
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

  const generateUsername = (username: string) => {
    form.setFieldValue(
      'username',
      username.toLowerCase().trim().replaceAll(' ', '')
    );
  };

  return (
    <form onSubmit={form.handleSubmit} className={'intro-y'}>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="text-sm mb-2 intro-y">
          Nama Toko
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
        <label htmlFor="name" className="text-sm mb-2 intro-y">
          Username
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
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.username ? form.errors.username : ''}
        </span>
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="text-sm mb-2 intro-y">
          Alamat
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
        <label htmlFor="name" className="text-sm intro-y">
          Nomor Whatsapp
        </label>
        <span className="mt-1 text-xs text-slate-500 intro-y mb-3">
          Untuk menerima pesanan dari pelanggan
        </span>
        <Cleave
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
          onChange={(e) => form.setFieldValue('phone', e.target.rawValue)}
          name="phone"
          onBlur={form.handleBlur}
          value={form.values.phone}
        />
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.phone ? form.errors.phone : ''}
        </span>
      </div>
      <div className="flex justify-end mt-8 ">
        <button className="btn intro-y w-min whitespace-nowrap" type="submit">
          <span>Selanjutnya</span>
        </button>
      </div>
    </form>
  );
}
