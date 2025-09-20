"use client";

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "../../types";
import { ExternalLink, Edit, Eye } from "lucide-react";

interface LinkCardProps {
  link: Link;
  onView?: (link: Link) => void;
  onEdit?: (link: Link) => void;
}

export function LinkCard({ link, onView, onEdit }: LinkCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Google: "bg-blue-100 text-blue-800",
      Social: "bg-green-100 text-green-800",
      Email: "bg-purple-100 text-purple-800",
      Direct: "bg-orange-100 text-orange-800",
      "Ad SEO": "bg-red-100 text-red-800",
      Affiliate: "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {/* Link Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <img src="/dark_blue_link.png" alt="Link" className="w-6 h-6" />
              </div>
            </div>

            {/* Link Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {link.name}
              </h3>
              <p className="text-sm text-gray-500 truncate mt-1">{link.url}</p>
              <div className="flex items-center mt-2 space-x-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${getCategoryColor(link.category)}`}
                >
                  {link.category}
                </Badge>
                <Badge
                  variant={link.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {link.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(link)}
              className="h-8 px-3"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(link)}
              className="h-8 px-3"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
