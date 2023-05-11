import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import Cleave from 'cleave.js/react';

type Props = {
  onSubmit: (code: string) => void;
  onBack: () => void;
};

export default function ActivationForm({ onSubmit, onBack }: Props) {
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: '',
    },
    validationSchema: yup.object().shape({
      code: yup.string().required('masukkan kode verifikasi').length(6),
    }),
    onSubmit: (values) => onSubmit(values.code),
  });
  return (
    <form onSubmit={form.handleSubmit} className={'intro-y'}>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="text-sm mb-2 intro-y">
          Kode Verifikasi
        </label>
        <input
          type="text"
          className={`form-input ${form.errors.code ? 'error' : ''}`}
          name="code"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.code}
        />
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.code ? form.errors.code : ''}
        </span>
      </div>
      <div className="flex justify-between mt-8 ">
        <button
          className="btn btn-transparent intro-y w-min whitespace-nowrap"
          type="button"
          onClick={onBack}
        >
          <span>Kembali</span>
        </button>
        <button className="btn intro-y w-min whitespace-nowrap" type="submit">
          <span>Aktivasi</span>
        </button>
      </div>
    </form>
  );
}
