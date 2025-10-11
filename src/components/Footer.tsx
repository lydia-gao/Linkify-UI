export default function Footer() {
  return (
    <footer className="mt-auto bg-[#f1f1ee] text-gray-500 text-sm px-6 py-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <p>© 2025 - Linkify Dashboard</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Careers
          </a>
          <a href="#" className="hover:underline">
            Policy
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
