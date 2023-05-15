import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { classNames } from '@/utils/helpers';

const units: Array<string> = [
  'item',
  'kg',
  'ons',
  'gram',
  'ikat',
  'bungkus',
  'porsi',
];

type Props = {
  value: string;
  onChange: (value: string | null) => void;
  error?: boolean;
};

export default function SelectUnit({ value, onChange, error }: Props) {
  const [query, setQuery] = useState<string>('');

  const filteredUnits =
    query === ''
      ? units
      : units.filter((unit) =>
          query ? unit.toLowerCase().includes(query.toLowerCase()) : true
        );

  const handleChange = (unit: string) => {
    if (unit) {
      unit = unit.replace(/^\s+|\s+$/g, '');
    }
    setQuery(unit);
    onChange(unit);
  };

  return (
    <div className="w-full">
      <Combobox value={value} onChange={handleChange} nullable>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden text-left focus:outline-none sm:text-sm">
            <Combobox.Input
              className={classNames('form-input', error ? 'error' : '')}
              displayValue={(unit: string) => unit}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={(e) => handleChange(e.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm">
              {filteredUnits.length === 0 && query !== '' && (
                <Combobox.Option
                  value={query}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {query}
                </Combobox.Option>
              )}
              {filteredUnits.map((unit) => (
                <Combobox.Option
                  key={unit}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={unit}
                >
                  {({ selected, active }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {unit}
                    </span>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
