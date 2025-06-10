"use client";

import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import BaseButton from "@/components/shared/BaseButton";

export default function EditProfileModalClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BaseButton
        className="  font-semibold md:h-[55px] lg:h-[65px] h-[50px] lg:text-[18px] "
        onClick={() => setIsModalOpen(true)}
      >
        프로필 편집
      </BaseButton>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
