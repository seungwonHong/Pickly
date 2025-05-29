import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewsList from "@/features/productId/components/ProductReviews/ProductReviewsList";
interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductIdPage({ params }: PageProps) {
  return (
    <div>
      <Header />
      <div className="w-[940px] h-[1687px] mx-auto my-[60px]">
        <ProductIdDetail params={params} />
        <ProductIdStats params={params} />
        <ProductReviewsList params={params} />
      </div>
    </div>
  );
}

// return (
//   <div className="text-amber-50">
//     <div>
//       <div>프로필이미지</div>
//       <div>
//         <div>유저이름</div>
//         <div>별점</div>
//       </div>
//     </div>
//     <div>
//       <div>내용</div>
//       <div>사진 있을수도 없을수도</div>
//       <div>
//         <div>날짜</div>
//         <div>따봉</div>
//       </div>
//     </div>
//   </div>
// );
// }
