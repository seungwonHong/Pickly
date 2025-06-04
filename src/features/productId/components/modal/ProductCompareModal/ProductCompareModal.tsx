"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

import ProductReviewStarModal from "./ProductReviewStarModal";
import ProductIdGetModal from "./ProductIdGetModal";
import ProductReviewInputModal from "./ProductReviewInputModal";
import BaseButton from "@/components/shared/BaseButton";

import useGetProductId from "../../../hooks/useGetProductId";
import { reviewService } from "../../../api";

import CloseX from "../../../../../../public/icons/close-x.png";

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProductCompareModal({
  open,
  setOpen,
}: ProductReviewModalProps) {
  return <div>dd</div>;
}
