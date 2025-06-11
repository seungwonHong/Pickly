import ProductReviewsListComponent from "./ProductReviewsListComponent";
import { GetProductIdReviews, GetProductIdReviewsDetail } from "../../types";

interface Props {
  initialData: GetProductIdReviews | null;
}

export default function ProductReviewClient({ initialData }: Props) {
  return (
    <>
      {initialData?.list?.map((review: GetProductIdReviewsDetail) => (
        <ProductReviewsListComponent key={review.id} review={review} />
      ))}
    </>
  );
}
