import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import BaseButton from "@/components/shared/BaseButton";
import useGetProductId from "../../hooks/useGetProductId";
import { reviewService } from "../../api";

import CloseX from "../../../../../public/icons/close-x.png";
export default function ProductReviewModal({
  open,
  setOpen,
  productUserId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productUserId: number;
}) {
  const { product } = useGetProductId();
  const postProductIdReview = useQuery({
    queryKey: ["postnpProductIdReview", product?.id],
    queryFn: () =>
      reviewService.postReviews(product?.id).then((res) => res.data),
    enabled: !!product?.id,
  });
  if (!open || !product) return null;
  return (
    <div className="w-[620px] h-[698px] bg-[#383842] rounded-2xl">
      <Image
        src={CloseX}
        alt="close"
        className="cursor-pointer w-[40px] h-[40px] mt-5 mr-5 mb-0 ml-0"
        onClick={() => setOpen(false)}
      />
      <div className="w-[540px] h-[598px] flex gap-[40px] flex-col justify-between">
        <div className="flex flex-col gap-[10px]">
          <div>{product.category.name}</div>
          <div>{product.name}</div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[20px]">
            <div>{postProductIdReview.data?.rating}</div>
            <div>별점갯수</div>
          </div>
          <div>{postProductIdReview.data?.content}</div>
          <div>{postProductIdReview.data?.image}</div>
        </div>
        <BaseButton>작성하기</BaseButton>
      </div>
    </div>
  );
}
