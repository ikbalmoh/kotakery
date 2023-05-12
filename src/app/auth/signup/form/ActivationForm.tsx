import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import Button from '@/components/Button';
import { MerchantAccount } from '@/@types/account';
import { registerMerchant } from '@/firebase/auth';
import { ConfirmationResult } from 'firebase/auth';
import RecaptchaContext, { RecaptchaContextType } from '@/contexts/recaptcha';
import { useRouter } from 'next/navigation';
import Cleave from 'cleave.js/react';

type Props = {
  AccountData: MerchantAccount;
  confirmationResult: ConfirmationResult;
  onBack: () => void;
};

export default function ActivationForm({
  AccountData,
  confirmationResult,
  onBack,
}: Props) {
  const router = useRouter();

  const { resetRecaptcha } = useContext(
    RecaptchaContext
  ) as RecaptchaContextType;

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitActivation = async (code: string) => {
    setLoading(true);
    try {
      await registerMerchant(AccountData, code, confirmationResult!);
      router.replace('/dashboard');
    } catch (error) {
      console.error(error);
      resetRecaptcha();
      setLoading(false);
    }
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: '',
    },
    validationSchema: yup.object().shape({
      code: yup
        .string()
        .required('masukkan kode verifikasi')
        .length(6, 'masukkan 6 digit kode'),
    }),
    onSubmit: (values) => onSubmitActivation(values.code),
  });
  return (
    <form onSubmit={form.handleSubmit} className={'intro-y'}>
      <div className="text-slate-500 text-sm mt-1 intro-y">
        Silahkan masukkan kode verifikasi yang telah kami kirimkan ke nomor{' '}
        <span className="font-bold">{AccountData.owner.phone}</span>
      </div>
      <div className="flex flex-col mb-3 mt-8">
        <label htmlFor="code" className="form-label intro-y">
          Kode Verifikasi <span>*</span>
        </label>
        <Cleave
          options={{ numericOnly: true, blocks: [1, 1, 1, 1, 1, 1] }}
          className={classNames(
            'form-input',
            form.touched.code && form.errors.code ? 'error' : ''
          )}
          name="code"
          onChange={(e) => form.setFieldValue('code', e.target.rawValue)}
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
        <Button loading={loading} label="Aktivasi Akun" type="submit" />
      </div>
    </form>
  );
}
