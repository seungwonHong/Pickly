import Image from "next/image";

import ThumbsUpButton from "@/components/shared/ThumbsUpButton";
import { formatDate } from "../../../../lib/utils/datetime";
import { GetProductIdReviewsDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";

import Star from "../../../../../public/icons/star.svg";
import DefaultIProfileImage from "../../../../../public/defaultIProfileImage.jpeg";

export default function ProductReviewsListComponent({
  review,
}: {
  review: GetProductIdReviewsDetail;
}) {
  const { user } = useGetUser();
  const isOwner = user?.id === review.userId;
  return (
    <div className="text-[#F1F1F5] flex justify-between p-[30px] bg-[#252530] rounded-2xl">
      <div className="flex items-start gap-[10px]">
        <Image
          src={review.user.image || DefaultIProfileImage}
          alt="프로필 이미지"
          width={43}
          height={43}
          className="rounded-full"
        />
        <div>
          <div className="text-[16px] font-medium">{review.user.nickname}</div>
          <div>
            <div className="flex gap-[2px]">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <Image
                  key={idx}
                  src={Star}
                  alt="별점"
                  width={20}
                  height={20}
                  className="inline-block"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[680px] flex flex-col gap-[20px]">
        <div className="text-[16px] font-medium">{review.content}</div>
        <div>
          {review.reviewImages.length > 0 && (
            <div className="flex gap-[20px]">
              {review.reviewImages.map((image) => (
                <img
                  key={image.id}
                  src={image.source}
                  alt="Review Image"
                  className="w-[100px] h-[100px] rounded-xl"
                />
              ))}
            </div>
          )}
          <></>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-[20px] text-[14px]">
            <div className=" text-[#6E6E82]">
              {formatDate(review.createdAt)}
            </div>
            {isOwner && (
              <div className="flex gap-[10px] text-[#9FA6B2] ">
                <div className="underline cursor-pointer">수정</div>
                <div className="underline cursor-pointer">삭제</div>
              </div>
            )}
          </div>

          <div>
            <ThumbsUpButton
              reviewId={review.id}
              initialLikeCount={review.likeCount}
              initialIsLiked={review.isLiked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
