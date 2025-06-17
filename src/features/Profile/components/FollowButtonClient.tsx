"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FollowButton from "./FollowButton";
import type { Props } from "./FollowButton";

export default function FollowButtonClient(props: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <FollowButton {...props} router={router} />;
}
