import { PhotoIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Props = {
  onChange: (file: File | null) => void;
  image?: File | string;
};

export default function ImagePicker({ onChange, image }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<string>();

  const openPicker = () => inputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file);
  };

  const onImageChange = (image: string | File | undefined) => {
    if (image instanceof File) {
      setFileUrl(URL.createObjectURL(image));
    } else {
      setFileUrl(image);
    }
  };

  useEffect(() => {
    onImageChange(image);
  }, [image]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />
      <div
        onClick={openPicker}
        className="rounded-md bg-slate-100 h-40 w-40 cursor-pointer flex flex-col items-center justify-center relative hover:opacity-75"
      >
        {fileUrl ? (
          <Image
            alt="image"
            fill
            className="rounded-md"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            src={fileUrl}
          />
        ) : (
          <PhotoIcon className="text-slate-400 w-14 h-14" />
        )}
      </div>
    </>
  );
}
