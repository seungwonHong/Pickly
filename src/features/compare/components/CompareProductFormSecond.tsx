import { useState } from "react";
import CompareProductInputSecond from "../components/CompareProductInputSecond";
import { GetServerSideProps } from "next";
import { ProductsResponse } from "../types/product";
import { productService } from "../api/api";

type Props = {
  teamId: string;
  initialProducts: ProductsResponse;
};

export default function CompareProductFormSecond({
  teamId,
  initialProducts,
}: Props) {
  const [product2, setProduct2] = useState<number | null>(null);

  return (
    <>
      <form className="flex flex-col gap-[10px] justify-center items-center mt-[40px]">
        <div className="flex flex-col md:flex-row gap-[20px] items-center">
          <CompareProductInputSecond
            label="상품 2"
            tagColor="pink"
            teamId={teamId}
            initialProducts={initialProducts}
            onProductSelectId={setProduct2}
          />
        </div>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID;
  const response = await productService.getProducts({});
  const initialProducts: ProductsResponse = response.data;

  return {
    props: {
      teamId,
      initialProducts,
    },
  };
};
