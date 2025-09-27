import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const mockLinks = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  title: "Example Website Homepage",
  longUrl: "https://example.com/your/long/url",
  shortUrl: "https://{your-domain}/(alias-or-code)",
  summary: "Summary\nGood link in Google.",
  clicks: 1269,
  expiration: "2023-12-31",
}));

export default function LinksPage() {
  return (
    <Layout>
      {/* Page title area */}
      <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800">All Links</h2>
          <p className="text-sm text-gray-500">Home &gt; All Products</p>
        </div>
      </section>

      {/* Content */}
      <main className="p-6 space-y-6 bg-[#f1f1ee]">
        <div className="flex flex-col gap-6">
          {mockLinks.map((link) => (
            <Card
              key={link.id}
              className="bg-[#fafaf8] border border-gray-200 rounded-md"
            >
              <CardContent className="p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{link.title}</h3>
                    <p className="text-xs text-gray-600">{link.longUrl}</p>
                    <p className="text-xs font-semibold text-gray-800">
                      {link.shortUrl}
                    </p>
                    <p className="mt-2 text-xs text-gray-500 whitespace-pre-line">
                      {link.summary}
                    </p>
                  </div>
                  <Image
                    src="/white_link.png"
                    alt="Link Thumbnail"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>

                <div className="flex justify-between items-start mt-4">
                  <div className="flex flex-col gap-2 text-xs text-gray-500">
                    <span>Clicks</span>
                    <span>Expiration</span>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-gray-700 text-right">
                    <span>{link.clicks}</span>
                    <span>{link.expiration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="inline-flex space-x-2 text-sm">
            <a className="px-3 py-1 bg-black text-white rounded">1</a>
            <a className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
              2
            </a>
            <a className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
              3
            </a>
            <a className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
              4
            </a>
            <span className="px-3 py-1">...</span>
            <a className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
              10
            </a>
            <a className="px-3 py-1 bg-white border rounded hover:bg-gray-100">
              NEXT
            </a>
          </nav>
        </div>
      </main>
    </Layout>
  );
}
