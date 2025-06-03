import React from "react";
import { ProductsResponse } from "../types/product";

type Props = {
  inputValue: string;
  productList: ProductsResponse;
  handleAddProduct: (id: number, name: string) => void;
  focusIndex: number;
  dropdownRef?: React.RefObject<HTMLDivElement |  null>;
};

export default function CompareDropdown({
  inputValue,
  productList,
  handleAddProduct,
}: Props) {
  const filteredProducts = productList.list.filter((product) =>
    product.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  return (
    <ul
      className="
        absolute left-0 top-full z-10 mt-[8px] w-full max-h-[260px] overflow-y-auto 
        flex flex-col gap-[8px] rounded-[8px] border border-[#353542] bg-[#252530] px-[16px] py-[16px]
      "
    >
      {filteredProducts.map(({ id, name }, index) => (
        <li key={id}>
          <button
            className={`
              w-full rounded-[5px] px-[20px] py-[10px] text-left 
              text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px]
              text-white hover:bg-[var(--color-deepGray)] focus:outline-none
              }
            `}
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
