import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { CartContext, CartContextType } from '@/contexts/cart';
import QtyButton from './QtyButton';
import { currency } from '@/utils/formater';
import Button from '@/components/Button';
import Cleave from 'cleave.js/react';
import { useFormik } from 'formik';
import { classNames } from '@/utils/helpers';
import 'cleave.js/dist/addons/cleave-phone.id';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { OrderForm } from '@/@types/cart';
import CheckoutConfirmation from './CheckoutConfirmation';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export default function Cart({ isOpen, onDismiss }: Props) {
  const { cart, changeQty, subtotal } = useContext(
    CartContext
  ) as CartContextType;

  const [confirmCheckout, setConfirmCheckout] = useState<boolean>(false);

  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (cart.length < 1) {
      onDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const form = useFormik<OrderForm>({
    initialValues: {
      name: '',
      phoneNumber: '',
      address: '',
      paymentMethod: 'Transfer',
    },
    validationSchema: yup.object({
      name: yup.string().required('isi nama pemesan'),
      phoneNumber: yup.string().required('isi nomor whatsapp'),
      address: yup.string().required('isi alamat'),
    }),
    onSubmit: () => setConfirmCheckout(true),
  });

  useEffect(() => {
    const onFormInvalid = () => {
      toast.error('Silahkan lengkapi form pemesanan', {
        position: 'top-center',
      });
      formRef.current?.scrollIntoView();
    };
    if (!form.isValid) {
      toast.remove();
      onFormInvalid();
    }
  }, [form.isValid, form.isSubmitting]);

  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={onDismiss} className="relative z-40">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur"
              aria-hidden="true"
            />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-100 translate-x-full"
          >
            <div className="fixed inset-0 flex items-end justify-end">
              <Dialog.Panel className="w-full md:max-w-sm xl:max-w-md h-screen bg-white">
                <Dialog.Title
                  as="div"
                  className="flex items-center px-5 h-16 bg-white border-b border-slate-200/60"
                >
                  <button
                    type="button"
                    className="mr-3 rounded-full"
                    onClick={onDismiss}
                  >
                    <XCircleIcon className="w-5 h-5 text-slate-500" />
                  </button>
                  <h3 className="text-base font-medium leading-6 text-slate-800">
                    Keranjang Belanja
                  </h3>
                </Dialog.Title>
                <form
                  onSubmit={form.handleSubmit}
                  className="w-full h-full overflow-x-auto bg-slate-50"
                >
                  <section className="flex flex-col border-t border-b border-slate-200/60 bg-white mt-3">
                    <div className="font-medium text-slate-700 px-5 py-3 border-b border-slate-200/60">
                      Daftar Pesanan
                    </div>
                    {cart.map((item) => (
                      <div
                        className="px-5 py-3 flex flex-col border-b border-slate-200/60"
                        key={item.id}
                      >
                        <div className="font-medium text-base text-slate-800">
                          {item.name}
                        </div>
                        <div className="mt-1 flex items-end">
                          <span className="text-red-600 font-semibold text-sm">
                            Rp{currency(item.price)}
                          </span>
                          <span className="text-xs text-slate-500">
                            /{item.unit}
                          </span>
                        </div>
                        <div className="flex justify-end mt-3">
                          <QtyButton
                            id={item.id}
                            qty={item.qty}
                            onChange={changeQty}
                          />
                        </div>
                      </div>
                    ))}
                  </section>
                  <section
                    className="flex flex-col border-t border-b border-slate-200/60 mt-3 bg-white mb-52"
                    ref={formRef}
                  >
                    <div className="font-medium text-slate-700 px-5 py-3 border-b border-slate-200/60 sticky top-0 bg-white">
                      Form Pemesanan
                    </div>
                    {/* Form */}
                    <div className="px-5 flex flex-col mt-3">
                      <div className="flex flex-col mb-3">
                        <label htmlFor="name" className="form-label ">
                          Nama Pemesan
                        </label>
                        <input
                          name="name"
                          type="text"
                          className={classNames(
                            `form-input `,
                            form.errors.name ? 'error' : ''
                          )}
                          value={form.values.name}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        />
                        <span className="mt-2 text-xs text-red-500 ">
                          {form.errors.name}
                        </span>
                      </div>
                      <div className="flex flex-col mb-3">
                        <label htmlFor="phoneNumber" className="form-label ">
                          Nomor Whatsapp
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
                            `form-input `,
                            form.errors.phoneNumber ? 'error' : ''
                          )}
                          name="phoneNumber"
                          onChange={(e) =>
                            form.setFieldValue('phoneNumber', e.target.rawValue)
                          }
                          onBlur={form.handleBlur}
                          value={form.values.phoneNumber}
                          autoFocus
                        />
                        <span className="mt-2 text-xs text-red-500 ">
                          {form.errors.phoneNumber}
                        </span>
                      </div>
                      <div className="flex flex-col mb-3">
                        <label htmlFor="address" className="form-label ">
                          Alamat Pengiriman
                        </label>
                        <textarea
                          name="address"
                          className={classNames(
                            `form-input `,
                            form.errors.address ? 'error' : ''
                          )}
                          value={form.values.address}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                        ></textarea>
                        <span className="mt-2 text-xs text-red-500 ">
                          {form.errors.address}
                        </span>
                      </div>
                      <div className="flex flex-col mb-3">
                        <label htmlFor="paymentMethod" className="form-label">
                          Metode Pembayaran
                        </label>
                        <div role="group" className="flex items-center">
                          <label htmlFor="transfer" className="mr-6">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="Transfer"
                              onChange={form.handleChange}
                              onBlur={form.handleBlur}
                              id="transfer"
                              checked={form.values.paymentMethod == 'Transfer'}
                            />
                            <span className="mx-2">Transfer</span>
                          </label>
                          <label htmlFor="cod">
                            <input
                              type="radio"
                              name="paymentMethod"
                              id="cod"
                              value="COD"
                              onChange={form.handleChange}
                              onBlur={form.handleBlur}
                              checked={form.values.paymentMethod == 'COD'}
                            />
                            <span className="mx-2">COD</span>
                          </label>
                        </div>
                        <span className="text-xs text-slate-500 mt-2">
                          Perhitungan total dengan ongkir akan diinfokan kembali
                          via Whatsapp
                        </span>
                      </div>
                    </div>
                  </section>
                  <section className="fixed bottom-0 w-full md:max-w-sm xl:max-w-md p-5 intro-y bg-white border-t border-slate-200/60">
                    <div className="flex items-center mb-2 text-slate-600 text-sm">
                      <div className="flex-1">
                        <div>Total</div>
                      </div>
                      <div className="font-semibold">{currency(subtotal)}</div>
                    </div>
                    <Button
                      danger
                      label="Pesan Sekarang"
                      className="w-full"
                      type="submit"
                    />
                  </section>
                </form>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
      <CheckoutConfirmation
        visible={confirmCheckout}
        onDismiss={() => setConfirmCheckout(false)}
        order={form.values}
      />
    </>
  );
}
