'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useContext, useState } from 'react';
import * as yup from 'yup';
import Image from 'next/image';
import {
  requestVerificationCode,
  verifyVerificationCode,
} from '@/firebase/auth';
import { ConfirmationResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import RecaptchaContext, { RecaptchaContextType } from '@/contexts/recaptcha';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.id';
import { classNames } from '@/utils/helpers';
import { isPhoneNumberRegistered } from '@/firebase/db';

export default function SigninForm() {
  const { recaptcha, resetRecaptcha, clearRecaptcha } = useContext(
    RecaptchaContext
  ) as RecaptchaContextType;

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const form = useFormik({
    initialValues: {
      phone: '+62',
    },
    validationSchema: yup.object().shape({
      phone: yup.string().test({
        name: 'phone',
        test: (value, ctx) => {
          if (!value || value == '+62') {
            return ctx.createError({ message: 'masukkan nomor telepon anda' });
          }
          if (value.length < 11) {
            return ctx.createError({ message: 'nomor tidak valid' });
          }
          return true;
        },
      }),
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
      const _confirmationResult: ConfirmationResult =
        await requestVerificationCode(phoneNumber, recaptcha!);
      setConfirmationResult(_confirmationResult);
      setVerifying(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const verifyCode = async (code: string) => {
    setLoading(true);
    try {
      await verifyVerificationCode(code, confirmationResult!);
      clearRecaptcha();
      router.replace('/dashboard');
    } catch (error) {
      resetRecaptcha();
      setLoading(false);
      console.error(error);
    }
  };

  const verifyForm = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: yup.object().shape({
      code: yup
        .string()
        .required('isi kode verifikasi')
        .length(6, 'kode harus 6 karakter')
        .label('kode verifikasi'),
    }),
    onSubmit: ({ code }) => verifyCode(code),
  });

  return !verifying ? (
    <form onSubmit={form.handleSubmit} className="intro-y">
      <div className="text-slate-600 mt-5 font-semibold text-lg intro-y">
        Silahkan Masuk
      </div>
      <div className="text-slate-500 text-sm mt-1 intro-y">
        Menggunakan nomor telepon yang sudah terdaftar untuk toko Anda
      </div>
      <div className={`mt-8 w-full`}>
        <div className="flex flex-col mb-5">
          <label htmlFor="phone" className="text-sm mb-2 intro-y">
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
            onChange={(e) => form.setFieldValue('phone', e.target.rawValue)}
            onBlur={form.handleBlur}
            value={form.values.phone}
            disabled={loading}
          />
          <span className="mt-2 text-xs text-red-500 intro-y">
            {form.errors.phone}
          </span>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="btn intro-y"
            type="submit"
            disabled={loading || !recaptcha}
          >
            <span>Lanjutkan</span>
            {loading && (
              <Image
                src={'/spinner-30.svg'}
                width={15}
                height={15}
                alt="loading"
              />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500 mt-8 border-t border-slate-100 pt-5">
          <span className="intro-y">Belum Punya Akun?</span>
          <Link href="/auth/signup" className="btn btn-transparent">
            Daftar Disini
          </Link>
        </div>
      </div>
    </form>
  ) : (
    <form onSubmit={verifyForm.handleSubmit} className="intro-y">
      <div className="text-slate-600 mt-5 font-semibold text-lg intro-y">
        Verifikasi
      </div>
      <div className="text-slate-500 text-sm mt-1 intro-y">
        Silahkan masukkan kode verifiaksi yang telah kami kirimkan ke nomor{' '}
        <span className="font-bold">{form.values.phone}</span>
      </div>
      <div className={`mt-8 w-full`}>
        <div className="flex flex-col mb-5">
          <label htmlFor="phone" className="text-sm mb-2 intro-y">
            Kode Verifikasi
          </label>
          <Cleave
            options={{
              numericOnly: true,
              blocks: [1, 1, 1, 1, 1, 1],
            }}
            type="text"
            className={`form-input intro-y ${
              verifyForm.errors.code ? 'error' : ''
            }`}
            name="code"
            onChange={(e) =>
              verifyForm.setFieldValue('code', e.target.rawValue)
            }
            onBlur={verifyForm.handleBlur}
            value={verifyForm.values.code}
            disabled={loading}
          />
          <span className="mt-2 text-xs text-red-500 intro-y">
            {verifyForm.errors.code}
          </span>
        </div>
        <div className="mt-8 flex flex-col intro-y">
          <button className="btn intro-y" disabled={loading} type="submit">
            <span>Masuk</span>
            {loading && (
              <Image
                src={'/spinner-30.svg'}
                width={15}
                height={15}
                alt="loading"
              />
            )}
          </button>
        </div>
        <div className="flex flex-col items-center mt-5">
          <div className="flex items-center justify-center text-slate-500">
            <span className="intro-y mr-3 text-sm">Tidak menerima kode?</span>
            <button
              type="button"
              className="btn btn-transparent text-xs intro-x"
              onClick={() => requestCode(form.values.phone)}
            >
              Kirim Ulang
            </button>
          </div>
          <div className="text-center my-5 text-xs text-slate-500 font-bold">
            atau
          </div>
          <button
            type="button"
            className="btn btn-transparent text-xs intro-y"
            onClick={() => setVerifying(false)}
          >
            Gunakan Nomor Lain
          </button>
        </div>
      </div>
    </form>
  );
}
