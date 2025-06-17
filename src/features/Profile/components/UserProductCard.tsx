// import Link from "next/link";

// interface ProductCardProps {
//   id: number;
//   name: string;
//   image: string;
//   reviewCount: number;
//   favoriteCount: number;
//   rating: number;
// }

// export default function ProductCard({
//   id,
//   name,
//   image,
//   reviewCount,
//   favoriteCount,
//   rating,
// }: ProductCardProps) {
//   return (
//     <Link href={`/product/${id}`}>
//       <div className="flex flex-col p-[15px] justify-center relative  border border-[#353542] bg-[#252530]  w-full rounded-[8px] z-[-1]">
//         <div className="flex justify-center relative items-center overflow-hidden w-full  h-[98px] mb-[10px] md:mb-[20px] md:h-[160px] lg:h=[200px] lg:mb-[25px] rounded-[8px]">
//           <img
//             src={image}
//             alt="productImage"
//             className="object-cover w-full h-full"
//           />
//         </div>
//         <p className="text-white font-semibold text-[14px] mb-[5px] md:mb-[10px] md:text-[16px] lg:text-[18px] ">
//           {name}
//         </p>
//         <div className="flex flex-col md:flex-row md:justify-between">
//           <div className="flex gap-[10px] text-[#6E6E82] font-normal text-[12px] md:text-[14px] md:gap-[5px] lg:text-[16px]">
//             <p>리뷰 {reviewCount}</p>
//             <p>찜 {favoriteCount}</p>
//           </div>
//           <div className="flex items-center gap-[3px]">
//             <p className="text-[#9FA6B2] text-[12px] font-normal md:text-[14px] lg:text-[16px]">
//               ⭐️ {Math.round(rating * 10) / 10}
//             </p>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
