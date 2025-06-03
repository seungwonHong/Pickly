import { useState } from "react";
import CompareProductInput from "../components/CompareProductInput";
import BaseButton from "../../../components/shared/BaseButton";
import { GetServerSideProps } from "next";
import { ProductsResponse } from "../types/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type Props = {
  teamId: string;
  initialProducts: ProductsResponse;
};

export default function CompareProductForm({ teamId, initialProducts }: Props) {
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");

  const isBothSelected = product1.trim() !== "" && product2.trim() !== "";


  return (
    <>
    <form 
    className="flex flex-col gap-[10px] justify-center items-center mt-[40px]">
  <div className="flex flex-col md:flex-row gap-[20px] items-center">
    <CompareProductInput
      label="상품 1"
      tagColor="green"
      teamId={teamId}
      initialProducts={initialProducts}
      onProductSelect={setProduct1}
      excludeName={product2}
    />
    <CompareProductInput
      label="상품 2"
      tagColor="pink"
      teamId={teamId}
      initialProducts={initialProducts}
      onProductSelect={setProduct2}
      excludeName={product1}
    />

    <span onClick={() => {
  if (!isBothSelected) {
    toast.warn("비교할 제품을 선택해 주세요");
  }
}}>
    <BaseButton
      disabled={!isBothSelected}        //type="submit" 필요 없는지
      className={`h-[70px] w-[500px] sm:w-[200px] mt-3 md:mt-8 text-[18px] ${isBothSelected ? "" : "pointer-events-none cursor-not-allowed text-[#6E6E82]"}`} 
    >
      비교하기
    </BaseButton>
  </span>
  </div>
</form>
<ToastContainer position="top-center" autoClose={2000} />
</>
  );
}



export const getServerSideProps: GetServerSideProps = async () => {
  const teamId = "14-6";
  const res = await fetch("https://api.example.com/products");
  const initialProducts: ProductsResponse = await res.json();

  return {
    props: {
      teamId,
      initialProducts,
    },
  };
};
