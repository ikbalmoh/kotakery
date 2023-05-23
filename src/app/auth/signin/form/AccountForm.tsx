import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import Button from '@/components/Button';
import Link from 'next/link';
import { isPhoneNumberRegistered } from '@/firebase/db/account';
import { ConfirmationResult } from 'firebase/auth';
import RecaptchaContext, { RecaptchaContextType } from '@/contexts/recaptcha';
import { requestVerificationCode } from '@/firebase/auth';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.id';

type Props = {
  onSubmit: ({
    confirmationResult,
    phoneNumber,
  }: {
    confirmationResult: ConfirmationResult;
    phoneNumber: string;
  }) => void;
};

export default function AccountForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { recaptcha, resetRecaptcha } = useContext(
    RecaptchaContext
  ) as RecaptchaContextType;

  const form = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: yup.object().shape({
      phone: yup.string().required('masukkan nomor telepon'),
    }),
    onSubmit: ({ phone }) => requestCode(phone),
  });

  const requestCode = async (phoneNumber: string) => {
    setLoading(true);
    try {
      const isRegistered: boolean = await isPhoneNumberRegistered(phoneNumber);
      if (!isRegistered) {
        console.log('Not Registered');
        form.setErrors({
          phone: 'Nomor tidak terdaftar. Silahkan periksa kembali',
        });
        setLoading(false);
        return;
      }
      if (!recaptcha) {
        await resetRecaptcha();
      }
      const confirmationResult: ConfirmationResult =
        await requestVerificationCode(phoneNumber, recaptcha!);
      onSubmit({
        confirmationResult,
        phoneNumber,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit} className="intro-y">
      <div className="text-slate-600 mt-5 font-semibold text-lg intro-y">
        Silahkan Masuk
      </div>
      <div className="text-slate-500 text-sm mt-1 intro-y">
        Menggunakan nomor telepon yang sudah terdaftar untuk toko Anda
      </div>
      <div className={`mt-8 w-full`}>
        <div className="flex flex-col mb-5">
          <label htmlFor="phone" className="form-label intro-y">
            Nomor Telepon
          </label>
          <Cleave
            options={{
              phone: true,
              phoneRegionCode: 'ID',
              prefix: '+62',
              tailPrefix: true,
              rawValueTrimPrefix: false,
            }}
            className={classNames(
              `form-input intro-y`,
              form.errors.phone ? 'error' : ''
            )}
            name="phone"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.phone}
            disabled={loading}
            autoFocus
          />
          <span className="mt-2 text-xs text-red-500 intro-y">
            {form.errors.phone}
          </span>
        </div>
        <div className="flex justify-end mt-6">
          <Button loading={loading} disabled={!recaptcha} label="Lanjutkan" />
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500 mt-8 border-t border-slate-100 pt-5">
          <span className="intro-y">Belum Punya Akun?</span>
          <Link href="/auth/signup" className="btn btn-transparent">
            Daftar Disini
          </Link>
        </div>
      </div>
    </form>
  );
}
