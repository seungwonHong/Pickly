"use client";
import { useState } from "react";

import { GetProductIdReviewsDetail } from "../../types";

import ProductReviewEdit from "./ProductReviewEdit";
import ProductReviewDelete from "./ProductReviewDelete";

interface ProductReviewEditDeleteProps {
  reviewId: number;
  initialReviewData: GetProductIdReviewsDetail;
}
export default function ProductReviewEditDelete({
  reviewId,
  initialReviewData,
}: ProductReviewEditDeleteProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex gap-[10px] text-[#9FA6B2] ">
      <button
        className="underline cursor-pointer"
        onClick={() => setEditOpen(true)}
      >
        수정
      </button>
      <button
        className="underline cursor-pointer"
        onClick={() => setDeleteOpen(true)}
      >
        삭제
      </button>
      {editOpen && (
        <ProductReviewEdit
          open={editOpen}
          setOpen={setEditOpen}
          reviewId={reviewId}
          initialReviewData={initialReviewData}
          editRating={initialReviewData.rating}
        />
      )}
      {deleteOpen && (
        <ProductReviewDelete
          open={deleteOpen}
          setOpen={setDeleteOpen}
          reviewId={reviewId}
          deletedReviewRating={initialReviewData.rating}
        />
      )}
    </div>
  );
}
