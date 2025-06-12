"use client";
import { useState } from "react";
import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";

export default function TestComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} className="text-amber-50">
        모달 열기
      </button>
      <ProductComparePlusModal
        open={open}
        setOpen={setOpen}
        message={"로그인이 필요한 서비스입니다."}
        buttonText="로그인하러가기"
        onButtonClick={() => {
          window.location.href = "/signin";
        }}
      />
    </div>
  );
}
