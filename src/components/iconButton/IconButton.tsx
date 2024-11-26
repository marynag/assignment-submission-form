"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type IIconButtonProps = {
  className: string;
};

export const IconButton = ({ className }: IIconButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <div
      className={`${className} inline-flex items-center justify-center absolute top-10 left-10 cursor-pointer`}
      onClick={handleClick}
    >
      <Image src={`/icons/backArrow.svg`} width={500} height={500} alt="icon" />
    </div>
  );
};
