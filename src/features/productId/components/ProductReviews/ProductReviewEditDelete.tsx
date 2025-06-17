"use client";
import { useState } from "react";

import ProductReviewEdit from "./ProductReviewEdit";
import ProductReviewDelete from "./ProductReviewDelete";

import { GetProductIdReviewsDetail } from "../../types";

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
        />
      )}
      {deleteOpen && (
        <ProductReviewDelete
          open={deleteOpen}
          setOpen={setDeleteOpen}
          reviewId={reviewId}
<<<<<<< HEAD
          initialReviewData={initialReviewData}
=======
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        />
      )}
    </div>
  );
}
