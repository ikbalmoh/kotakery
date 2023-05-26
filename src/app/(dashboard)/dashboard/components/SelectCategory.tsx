import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  Ref,
  MutableRefObject,
  useContext,
} from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import db from '@/firebase/db/db';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { classNames } from '@/utils/helpers';
import Category from '@/@types/category';
import { storeCategory } from '@/firebase/db/product';
import { AuthContext, AuthContextType } from '@/contexts/auth';

type Props = {
  value: string | null;
  onChange: (id: string | null) => void;
  error?: boolean;
  allowAdd?: boolean;
  nullable?: boolean;
};

export default function SelectCategory({
  value,
  onChange,
  error,
  allowAdd,
  nullable,
}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType;

  const defaultCategory: Category = { id: null, name: 'Semua Etalase' };

  const [category, setCategory] = useState<Category | null>(
    nullable ? defaultCategory : null
  );
  const [categories, setCategoies] = useState<Array<Category>>([]);
  const [search, setSearch] = useState<string>('');

  const filteredCategories =
    search === ''
      ? categories
      : categories.filter((cat) =>
          cat.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(search.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (!user) {
      return;
    }
    const q = query(
      collection(db, 'categories'),
      where('merchantId', '==', user?.uid),
      orderBy('name', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _categories: Array<Category> = [];
      if (nullable) {
        _categories.push(defaultCategory);
      }
      querySnapshot.forEach((doc) => {
        _categories.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setCategoies(_categories);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    let selected: Category | null = null;

    if (value) {
      const cat = categories.find((c) => c.id === value);
      if (cat) {
        selected = cat;
      }
    } else if (nullable) {
      selected = defaultCategory;
    }
    setCategory(selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, value]);

  const handleChange = async (value: Category) => {
    if (value?.id === 'new') {
      const id: string = await storeCategory(value.name);
      onChange(id);
    } else {
      onChange(value?.id ?? null);
    }
  };

  return (
    <div className="w-full">
      <Combobox value={category} onChange={handleChange} nullable>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden text-left focus:outline-none sm:text-sm">
            <Combobox.Input
              className={classNames('form-input', error ? 'error' : '')}
              displayValue={(category: Category) => category?.name}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                allowAdd ? 'Pilih atau buat etalase baru' : 'Pilih etalase'
              }
              autoFocus={false}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setSearch('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm z-30">
              {filteredCategories.length === 0 && search !== '' ? (
                allowAdd ? (
                  <Combobox.Option
                    value={{
                      id: 'new',
                      name: search,
                    }}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    Buat etalase baru{' '}
                    <span className="font-bold">{search}</span>
                  </Combobox.Option>
                ) : (
                  <div className="bg-white text-slate-500 text-xs py-2 px-4 text-center">
                    etalase tidak diemukan
                  </div>
                )
              ) : (
                filteredCategories.map((category) => (
                  <Combobox.Option
                    key={category.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.name}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
