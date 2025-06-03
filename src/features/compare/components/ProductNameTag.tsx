type ProductNameTagProps = {
  productName: string;
  color: "green" | "pink";
  handleDeleteButtonClick: () => void;
  inline?: boolean;
};

export default function ProductNameTag({
  productName,
  color,
  handleDeleteButtonClick,
  inline = false,
}: ProductNameTagProps) {
  const backgroundColor = color === "green" ? "#DCFCE7" : "#FCE7F3";
  const textColor = color === "green" ? "#15803D" : "#BE185D";

  return (
    <span
      className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
        inline ? "h-[40px] min-w-[100px]" : ""
      }`}
      style={{
        backgroundColor,
        color: textColor,
        pointerEvents: inline ? "none" : "auto",
      }}
    >

    </span>
  );
}
