import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="h-screen flex">
      {/* Left side - Background Image */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/white_link.png"
          alt="background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        {/* Logo */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Linkify Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-8">
        <div className="max-w-md w-full space-y-6">
          {/* Title */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && (
              <a href="#" className="text-sm text-blue-600 hover:underline">
                {subtitle}
              </a>
            )}
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
