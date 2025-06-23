"use client";

import { useEffect, useRef, useState } from "react";
import apiInstance from "@/lib/axios";
import Image from "next/image";
import closeButton from "@../../../public/closeButton.png";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import defaultProfileImage from "@../../../public/defaultProfileImage.jpeg";
import Link from "next/link";
export interface UserSummary {
  id: number;
  nickname: string;
  image: string;
  description?: string;
  teamId?: string;
}

export interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "followers" | "followees";
  userId: number;
  nickname: string;
}

export interface FollowerResponseItem {
  follower: {
    id: number;
    nickname: string;
    image: string;
    description?: string;
    teamId?: string;
  };
  id: number;
}

export interface FolloweeResponseItem {
  followee: {
    id: number;
    nickname: string;
    image: string;
    description?: string;
    teamId?: string;
  };
  id: number;
}

export default function FollowListModal({
  isOpen,
  onClose,
  type,
  userId,
  nickname,
}: FollowListModalProps) {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const { ref: observerRef, inView } = useInView();
  const [isFetching, setIsFetching] = useState(false);

  const fetchList = async (cursor = 0) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const endpoint =
        type === "followers"
          ? `/users/${userId}/followers`
          : `/users/${userId}/followees`;

      const res = await apiInstance.get(endpoint, {
        params: { cursor },
      });

      const rawList = res.data.list;
      const extracted =
        type === "followers"
          ? (rawList as FollowerResponseItem[]).map((item) => item.follower)
          : (rawList as FolloweeResponseItem[]).map((item) => item.followee);

      setUsers((prev) => {
        const newIds = new Set(prev.map((u) => u.id));
        const filtered = extracted.filter((u) => !newIds.has(u.id));
        return [...prev, ...filtered];
      });

      const next = res.data.nextCursor;
      if (next === null || next === undefined) {
        setHasNext(false);
        return;
      } else {
        setPage(next);
      }
    } catch (err) {
      console.error("팔로우 리스트 조회 실패", err);
      setHasNext(false);
    } finally {
      setIsFetching(false);
    }
  };

  // 최초 오픈 시 초기화 및 1페이지 호출
  useEffect(() => {
    if (isOpen) {
      setUsers([]);
      setPage(0);
      setHasNext(true);
      fetchList(0);
    }
  }, [isOpen, type, userId]);

  // 스크롤 감지 시 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNext && !isFetching && page !== 0) {
      fetchList(page);
    }
  }, [inView, hasNext, isFetching, page]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title =
    type === "followers"
      ? `${nickname}님을 팔로우하는 유저`
      : `${nickname}님이 팔로우하는 유저`;

  return createPortal(
    <div className="fixed inset-0 bg-[#000000]/50 z-50 flex items-center justify-center ">
      <div
        className="relative bg-[#1C1C22] rounded-xl   h-[700px] sm:h-[550px] overflow-y-auto p-8 md:rounded-2xl w-[335px]  md:w-[500px] lg:w-[500px]"
        ref={modalRef}
      >
        {/* 닫기 버튼 */}
        <Image
          src={closeButton}
          className="absolute w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 top-[15px] right-[15px] md:top-5 md:right-5 cursor-pointer"
          onClick={onClose}
          alt="모달닫기 버튼"
        />

        {/* 타이틀 */}
        <h2 className=" text-[20px] text-[#ffffff] lg-[24px] font-semibold  my-7">
          {title}
        </h2>

        {/* 리스트 */}
        {users.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">
            아직 유저가 없습니다.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {users.map((user, index) => (
              <li
                key={`${user.id}-${index}`}
                className="flex items-center gap-3 hover:bg-[#2A2A2F] transition-colors rounded-[8px]"
              >
                <Link
                  href={`/users/${user.id}`}
                  className="flex items-center gap-3  p-2  "
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ">
                    <Image
                      src={
                        user.image && user.image !== "https://none"
                          ? user.image
                          : defaultProfileImage
                      }
                      alt="유저 이미지"
                      fill
                    />
                  </div>
                  <span className="text-white text-sm">{user.nickname}</span>
                </Link>
              </li>
            ))}
            <div ref={observerRef} className="h-6" />
          </ul>
        )}
      </div>
    </div>,
    document.body
  );
}
