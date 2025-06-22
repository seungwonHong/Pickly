"use client";
import { toast } from "react-hot-toast";
import TypeButton from "@/components/shared/TypeButton";
import { useRouter } from "next/navigation";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("로그아웃 되었습니다.");
        router.push("/");
        router.refresh();
      } else {
        toast.error("로그아웃 실패");
      }
    } catch {
      toast.error("에러가 발생했습니다.");
    } finally {
      setModalOpen(false);
    }
  };
  return (
    <>
      <TypeButton
        className=" hover:bg-[#BF0C0C] hover:border-none  font-semibold md:h-[55px] lg:h-[65px] lg:text-[18px] h-[50px]"
        type="tertiary"
        onClick={() => setModalOpen(true)}
      >
        로그아웃
      </TypeButton>
      <LogoutConfirmModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
