import { useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  let styles =
    "fixed top-20 right-4 z-50 p-4 rounded-md text-primary max-w-[300px] w-full bg-white border-l-[6px]";

  if (type === "SUCCESS") {
    styles += " border-green-800 bg-gray-200";
  } else {
    styles += " border-red-800 bg-red-100";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={styles}>
      <div className="flex justify-center gap-4 items-center top">
        <span
          className={`text-white border rounded-full p-1 ${
            type === "SUCCESS" ? "bg-green-800" : "bg-red-800"
          }`}
        >
          {type === "SUCCESS" ? <IoCheckmark /> : <HiXMark />}
        </span>
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}
