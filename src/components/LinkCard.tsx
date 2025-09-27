import Image from "next/image";

interface LinkCardProps {
  title: string;
  originalUrl: string;
  shortUrl: string;
  description?: string;
  clicks: number;
  expiration?: string;
  thumbnail?: string;
}

export default function LinkCard({
  title,
  originalUrl,
  shortUrl,
  description,
  clicks,
  expiration,
  thumbnail = "/white_link.png",
}: LinkCardProps) {
  return (
    <div className="bg-white shadow rounded-md p-4 text-sm">
      <div className="flex justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-600">{originalUrl}</p>
          <p className="text-xs font-semibold text-gray-800">{shortUrl}</p>
          {description && (
            <p className="mt-2 text-xs text-gray-500">
              Summary
              <br />
              {description}
            </p>
          )}
        </div>
        <Image
          src={thumbnail}
          alt="Link Thumbnail"
          width={64}
          height={64}
          className="w-16 h-16 rounded-md object-cover"
        />
      </div>
      <div className="flex justify-between items-start mt-4">
        <div className="flex flex-col gap-2 text-xs text-gray-500">
          <span>Clicks</span>
          {expiration && <span>Expiration</span>}
        </div>
        <div className="flex flex-col gap-2 text-sm text-gray-700 text-right">
          <span>{clicks}</span>
          {expiration && <span>{expiration}</span>}
        </div>
      </div>
    </div>
  );
}
