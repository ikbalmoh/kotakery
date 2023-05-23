import Cleave from 'cleave.js/react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import RecaptchaContext, { RecaptchaContextType } from '@/contexts/recaptcha';
import { verifyVerificationCode } from '@/firebase/auth';
import { ConfirmationResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

type Props = {
  phoneNumber: string;
  confirmationResult: ConfirmationResult;
  onBack: () => void;
};

export default function VerificationForm({
  phoneNumber,
  confirmationResult,
  onBack,
}: Props) {
  const router = useRouter();

  const { clearRecaptcha } = useContext(
    RecaptchaContext
  ) as RecaptchaContextType;
  const [loading, setLoading] = useState<boolean>(false);

  const verifySignin = async (code: string) => {
    setLoading(true);
    try {
      await verifyVerificationCode(code, confirmationResult);
      clearRecaptcha();
      router.replace('/dashboard');
    } catch (error) {
      verifyForm.setErrors({
        code: 'Kode salah. Silahkan periksa kembali',
      });
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
    onSubmit: ({ code }) => verifySignin(code),
  });

  return (
    <form onSubmit={verifyForm.handleSubmit} className="intro-y">
      <div className="text-slate-600 mt-5 font-semibold text-lg intro-y">
        Verifikasi
      </div>
      <div className="text-slate-500 text-sm mt-1 intro-y">
        Silahkan masukkan kode verifiaksi yang telah kami kirimkan ke nomor{' '}
        <span className="font-bold">{phoneNumber}</span>
      </div>
      <div className={`mt-8 w-full`}>
        <div className="flex flex-col mb-5">
          <label htmlFor="phone" className="form-label intro-y">
            Kode Verifikasi
          </label>
          <Cleave
            options={{
              numericOnly: true,
              blocks: [1, 1, 1, 1, 1, 1],
            }}
            type="text"
            className={`form-input intro-y ${
              verifyForm.touched.code && verifyForm.errors.code ? 'error' : ''
            }`}
            name="code"
            onChange={(e) =>
              verifyForm.setFieldValue('code', e.target.rawValue)
            }
            onBlur={verifyForm.handleBlur}
            value={verifyForm.values.code}
            disabled={loading}
            autoFocus
          />
          <span className="mt-2 text-xs text-red-500 intro-y">
            {verifyForm.errors.code}
          </span>
        </div>
        <div className="mt-8 flex flex-col intro-y">
          <Button loading={loading} label="Masuk" />
        </div>
        <div className="flex flex-col items-center mt-5">
          <div className="flex items-center justify-center text-slate-500">
            <span className="intro-y mr-3 text-sm">Tidak menerima kode?</span>
            <button
              type="button"
              className="btn btn-transparent text-xs intro-x"
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
            onClick={onBack}
          >
            Gunakan Nomor Lain
          </button>
        </div>
      </div>
    </form>
  );
}
