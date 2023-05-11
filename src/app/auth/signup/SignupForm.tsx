'use client';

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import {
  UserIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
} from '@heroicons/react/20/solid';
import StepWizard from '@/components/StepWizard';
import MerchantForm from './form/MerchantForm';
import AccountForm from './form/AccountForm';
import ActivationForm from './form/ActivationForm';
import {
  accountData,
  merchantData,
  merchantAccount,
} from '../../../@types/account';
import { requestVerificationCode, registerMerchant } from '@/firebase/auth';
import { ConfirmationResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import RecaptchaContext, { RecaptchaContextType } from '@/contexts/recaptcha';

const wizards: Array<{
  step: number;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >;
  title: string;
}> = [
  { step: 1, title: 'Toko', icon: BuildingStorefrontIcon },
  { step: 2, title: 'Akun', icon: UserIcon },
  { step: 3, title: 'Aktivasi', icon: ShieldCheckIcon },
];

export default function SignupForm() {
  const router = useRouter();

  const { recaptcha, resetRecaptcha, clearRecaptcha } = useContext(
    RecaptchaContext
  ) as RecaptchaContextType;

  const [step, setStep] = useState<number>(1);

  const [merchantFormValues, setMerchantFormValues] = useState<merchantData>();
  const [accountFormValues, setAccountFormValues] = useState<accountData>();
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const onSubmitMerchant = (values: merchantData) => {
    setMerchantFormValues(values);
    setStep(2);
    if (!accountFormValues?.phone) {
      setAccountFormValues({ ...accountFormValues, phone: values.phone });
    }
  };

  const onSubmitAccount = async (values: accountData) => {
    try {
      if (!recaptcha) {
        resetRecaptcha();
      }
      const result: ConfirmationResult = await requestVerificationCode(
        values.phone!,
        recaptcha!
      );
      setAccountFormValues(values);
      setConfirmationResult(result);
      setStep(3);
      const account = {
        ...values,
        merchant: { ...merchantFormValues },
      };
      console.log(account);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitActivation = async (code: string) => {
    try {
      const account: merchantAccount = {
        ...merchantFormValues,
        owner: {
          ...accountFormValues,
        },
      };

      await registerMerchant(account, code, confirmationResult!);
      clearRecaptcha();
      router.replace('/dashboard');
    } catch (error) {
      console.error(error);
      resetRecaptcha();
    }
  };

  return (
    <div className="flex flex-col intro-y">
      <h1 className="text-slate-600 mt-5 font-semibold text-lg intro-y">
        Registrasi Toko
      </h1>
      <div className="text-slate-500 text-sm mt-1 intro-y">
        Silahkan lengkapi form dibawah ini untuk mulai menggunakan Kotakery
      </div>
      <div className={`mt-8 w-full`}>
        <div className="flex flex-col">
          <div className="mb-5">
            <StepWizard steps={wizards} active={step} />
          </div>
          {step == 1 && (
            <MerchantForm
              onSubmit={onSubmitMerchant}
              initialValues={merchantFormValues}
            />
          )}
          {step == 2 && (
            <AccountForm
              onSubmit={onSubmitAccount}
              onBack={() => setStep(1)}
              initialValues={accountFormValues}
            />
          )}
          {step == 3 && (
            <ActivationForm
              onSubmit={onSubmitActivation}
              onBack={() => setStep(2)}
            />
          )}
        </div>
        {step === 1 && (
          <div className="flex items-center justify-between text-sm text-slate-500 mt-8 border-t border-slate-100 pt-5">
            <span className="intro-y">Sudah Punya Akun?</span>
            <Link href="/auth/signin" className="btn btn-transparent">
              Masuk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
