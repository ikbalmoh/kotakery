'use client';
import { useState } from 'react';
import { ConfirmationResult } from 'firebase/auth';
import AccountForm from './AccountForm';
import VerificationForm from './VerificationForm';

export default function SigninForm() {
  const [step, setStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const onConfirmationRequested = (result: {
    confirmationResult: ConfirmationResult;
    phoneNumber: string;
  }) => {
    setConfirmationResult(result.confirmationResult);
    setPhoneNumber(result.phoneNumber);
    setStep(2);
  };

  return step === 1 ? (
    <AccountForm onSubmit={onConfirmationRequested} />
  ) : (
    <VerificationForm
      confirmationResult={confirmationResult!}
      phoneNumber={phoneNumber}
    />
  );
}
