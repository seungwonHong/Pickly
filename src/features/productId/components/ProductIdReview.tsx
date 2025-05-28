"use client";

import Image from "next/image";

import useGetUser from "../hooks/useGetUser";
import useGetProductId from "../hooks/useGetProductId";

import HeartInactive from "../../../../public/svg/heart-inactive.svg";
import KakaoLink from "../../../../public/image/kakao-link.png";
import LinkShare from "../../../../public/image/link-share.png";

export default function ProductIdReview() {
  // useGetProductId 훅을 사용하여 상품 정보를 가져옴
  const { product, isLoading, isError, error } = useGetProductId();
  // useGetUser 훅을 사용하여 사용자 정보를 가져옴
  const { user } = useGetUser();

  if (isLoading) return <div>로딩 이모티콘 들어가야 함</div>;
  if (isError) return <div>에러 발생: {(error as Error).message} </div>;
  if (!product) return <div>상품 정보가 없습니다.</div>;

  return (
    <div className="flex items-start justify-between gap-10 text-[#f1f1f5]">
      <img src={product.image} width={306} height={228} alt="상품 이미지" />

      <div className="w-[545px] ">
        <div className="pb-[9.5px]">{product.category.name}</div>
        <div className="flex items-center justify-between pb-[49px]">
          <div className="flex items-center gap-[15px] justify-between">
            <div className="text-2xl font-semibold">{product.name}</div>
            {/* 토큰 완료되면 좋아요 활성화 / 비활성화화 */}
            <Image src={HeartInactive} alt="좋아요" width={28} height={28} />
          </div>
          <div className="flex items-center justify-between gap-[10px] ">
            <Image
              src={KakaoLink}
              alt="카카오 공유 링크"
              width={28}
              height={28}
            />
            <Image src={LinkShare} alt="링크 공유" width={28} height={28} />
          </div>
        </div>
        <div className="text-[16px] pb-[60px] font-normal">
          {product.description}
        </div>
        {user?.id === product.userId ? (
          <div className="flex items-center justify-between">
            <div>버튼1 머지 하고 이거 넣어야 해요</div>
            <div>버튼2 머지 하고 이거 넣어야 해요</div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>버튼1 머지 하고 </div>
            <div>버튼2 머지 하고 </div>
            <div>버튼3 머지 하고 </div>
          </div>
        )}
      </div>
    </div>
  );
}
