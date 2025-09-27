import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/types";

interface LinkCardProps {
  link: Link;
  onEdit?: (link: Link) => void;
  onDelete?: (linkId: string) => void;
}

export function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  return (
    <Card>
      <CardContent className="p-4 text-sm">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{link.title}</h3>
            <p className="text-xs text-gray-600">{link.originalUrl}</p>
            <p className="text-xs font-semibold text-gray-800">
              {link.shortUrl}
            </p>
            {link.description && (
              <p className="mt-2 text-xs text-gray-500">
                Summary
                <br />
                {link.description}
              </p>
            )}
          </div>
          <Image
            src={link.thumbnail || "/white_link.png"}
            alt="Link Thumbnail"
            width={64}
            height={64}
            className="w-16 h-16 rounded-md object-cover"
          />
        </div>
        <div className="flex justify-between items-start mt-4">
          <div className="flex flex-col gap-2 text-xs text-gray-500">
            <span>Clicks</span>
            {link.expiration && <span>Expiration</span>}
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-700 text-right">
            <span>{link.clicks}</span>
            {link.expiration && <span>{link.expiration}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
