import React from "react";
import { ProductsResponse } from "../types/product";

type UserProduct ={
  id: number;
  name: string;
};

type Props = {
  productList:{ list: UserProduct[] };
  handleAddProduct: (id: number, name: string) => void;
};

export default function CompareDropdown({
  productList,
  handleAddProduct,
}: Props) {
  return (
    <ul
      className="
        absolute left-0 top-full z-10 mt-[8px] w-full max-h-[260px] overflow-y-auto 
        flex flex-col gap-[8px] rounded-[8px] border border-[#353542] bg-[#252530] px-[10px] py-[16px]
      "
    >
      {productList.list.map(({ id, name }) => (
        <li key={id}>
          <button
            className="
              w-full rounded-[6px] px-[15px] py-[10px] text-left 
              text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px]
              text-[var(--color-deepGray)] hover:bg-[#353542] hover:text-white focus:outline-none
            "
            onClick={() => handleAddProduct(id, name)}
            type="button"
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}