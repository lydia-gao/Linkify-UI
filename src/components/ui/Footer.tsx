export function Footer() {
  return (
    <footer className="p-6 text-sm text-gray-500 flex justify-between bg-[#f1f1ee]">
      <p>© 2023 - Linkify Dashboard</p>
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
    </footer>
  );
}
