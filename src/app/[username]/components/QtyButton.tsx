import React from 'react';

type Props = {
  id: string;
  qty: number;
  onChange: (id: string, qty: string | number) => void;
};

export default function QtyButton({ id, qty, onChange }: Props) {
  return (
    <div className="rounded-md shadow-md border border-red-600 h-8 flex items-center font-medium bg-white">
      <button
        className="pl-3 pr-1 text-red-600 h-full text-base"
        onClick={() => onChange(id, '-')}
        type="button"
      >
        -
      </button>
      <input
        type="text"
        value={qty}
        onChange={(e) =>
          onChange(id, e.target.value ? parseInt(e.target.value) : 1)
        }
        className="px-3 text-xs outline-none w-10 text-center"
      />
      <button
        className="pr-3 pk-1 text-red-600 h-full text-base"
        onClick={() => onChange(id, '+')}
        type="button"
      >
        +
      </button>
    </div>
  );
}
