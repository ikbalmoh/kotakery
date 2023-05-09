'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as yup from 'yup';
import Image from 'next/image';
import {
  auth,
  requestVerificationCode,
  verifyVerificationCode,
} from '@/firebase/auth';
import { ConfirmationResult, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SigninForm() {
  const router = useRouter();

  auth.onAuthStateChanged((user: User | null) => {
    if (user) {
      router.replace('/dashboard');
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const requestCode = async (phoneNumber: string) => {
    setLoading(true);
    try {
      const _confirmationResult: ConfirmationResult =
        await requestVerificationCode(phoneNumber);
      setConfirmationResult(_confirmationResult);
      setVerifying(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const verifyCode = async (code: string) => {
    setLoading(true);
    try {
      const user = await verifyVerificationCode(code, confirmationResult!);
      setLoading(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const form = useFormik({
    initialValues: {
      phone: '+62',
    },
    validationSchema: yup.object().shape({
      phone: yup
        .string()
        .required('isi nomor telepon')
        .min(10, 'isi nomor telepon')
        .label('nomor telepon'),
    }),
    onSubmit: ({ phone }) => requestCode(phone),
  });

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
          <input
            type="text"
            className={`form-input intro-y ${form.errors.phone ? 'error' : ''}`}
            placeholder="+62"
            name="phone"
            onChange={form.handleChange}
            value={form.values.phone}
            disabled={loading}
          />
          <span className="mt-2 text-xs text-red-500 intro-y">
            {form.errors.phone}
          </span>
        </div>
        <button className="mt-8 btn intro-y" type="submit" disabled={loading}>
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
        <div className="flex items-center justify-between text-sm text-slate-500 mt-8 border-t border-slate-100 pt-5">
          <span className="intro-y">Belum Punya Akun?</span>
          <Link href="/auth/register" className="btn btn-transparent">
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
          <input
            type="text"
            className={`form-input intro-y ${
              verifyForm.errors.code ? 'error' : ''
            }`}
            name="code"
            onChange={verifyForm.handleChange}
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
              disabled={loading}
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
