import Image from "next/image";

interface GoogleButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function GoogleButton({
  onClick,
  children = "Google",
  className = "",
}: GoogleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 transition-colors ${className}`}
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="font-medium">{children}</span>
    </button>
  );
}
