"use client";
import { toast } from "react-hot-toast";
import TypeButton from "@/components/shared/TypeButton";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("로그아웃 되었습니다!");
        router.push("/"); // 홈페이지로 이동
        router.refresh(); // 상태 초기화
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("로그아웃에 실패했어요.");
    }
  };

  return (
    <TypeButton
      className=" hover:bg-[#BF0C0C] hover:border-none  font-semibold md:h-[55px] lg:h-[65px] lg:text-[18px] h-[50px]"
      type="tertiary"
      onClick={handleLogout}
    >
      로그아웃
    </TypeButton>
  );
}
