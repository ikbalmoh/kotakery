import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.id';
import { AccountData } from '@/@types/account';
import RecaptchaContext, { RecaptchaContextType } from '@/contexts/recaptcha';
import { ConfirmationResult } from 'firebase/auth';
import { requestVerificationCode } from '@/firebase/auth';
import Button from '@/components/Button';
import { isPhoneNumberRegistered } from '@/firebase/db/account';

type Props = {
  onSubmit: ({
    account,
    confirmationResult,
  }: {
    account: AccountData;
    confirmationResult: ConfirmationResult;
  }) => void;
  onBack: () => void;
  initialValues?: AccountData;
};

export default function AccountForm({
  onSubmit,
  onBack,
  initialValues,
}: Props) {
  const { recaptcha, resetRecaptcha } = useContext(
    RecaptchaContext
  ) as RecaptchaContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitAccount = async (values: AccountData) => {
    setLoading(true);
    try {
      const phoneNumberRegistered = await isPhoneNumberRegistered(
        values.phone!
      );
      if (phoneNumberRegistered) {
        form.setErrors({ phone: 'nomor sudah terdaftar' });
        setLoading(false);
        return;
      }
      if (!recaptcha) {
        resetRecaptcha();
      }
      const result: ConfirmationResult = await requestVerificationCode(
        values.phone!,
        recaptcha!
      );
      onSubmit({
        account: values,
        confirmationResult: result,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const form = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
          email: '',
          phone: '',
        },
    validationSchema: yup.object().shape({
      name: yup.string().required('isi nama lengkap'),
      email: yup.string().email('email tidak valid').nullable(),
      phone: yup.string().test({
        name: 'phone',
        test: (value, ctx) => {
          if (!value || value == '+62') {
            return ctx.createError({ message: 'masukkan nomor telepon' });
          }
          if (value.length < 11) {
            return ctx.createError({ message: 'nomor tidak valid' });
          }
          return true;
        },
      }),
    }),
    onSubmit: onSubmitAccount,
  });

  return (
    <form onSubmit={form.handleSubmit} className={'intro-y'}>
      <div className="flex flex-col mb-3">
        <label htmlFor="name" className="form-label intro-y">
          Nama Lengkap Anda <span>*</span>
        </label>
        <input
          type="text"
          className={classNames(
            'form-input intro-y',
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

      <div className="flex flex-col mb-3">
        <label htmlFor="phone" className="form-label intro-y">
          Nomor Telepon <span>*</span>
        </label>
        <span className="text-xs text-slate-500 intro-y mb-3">
          Akan digunakan untuk aktivasi dan login. Pastikan nomor anda aktif
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
      <div className="flex flex-col mb-3">
        <label htmlFor="email" className="form-label intro-y">
          Email
        </label>

        <input
          type="email"
          className={classNames(
            'form-input intro-y',
            form.touched.email && form.errors.email ? 'error' : ''
          )}
          name="email"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.email}
        />
        <span className="mt-2 text-xs text-red-500 intro-y">
          {form.touched.email ? form.errors.email : ''}
        </span>
      </div>
      <div className="flex justify-between mt-8 ">
        <button
          className="btn btn-transparent intro-y w-min whitespace-nowrap"
          type="button"
          onClick={onBack}
        >
          <span>Sebelumnya</span>
        </button>
        <Button label="Aktifkan Akun" loading={loading} />
      </div>
    </form>
  );
}
