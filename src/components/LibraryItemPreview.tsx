import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Film,
  ImageIcon,
  Music2,
  Link as LinkIcon,
  Archive,
  FileQuestion,
  Eye,
  Edit3,
  Star,
} from 'lucide-react';

export type LibraryItemType = 'document' | 'video' | 'image' | 'audio' | 'link' | 'archive' | 'collection' | 'unknown';

interface LibraryItemPreviewProps {
  id: string;
  itemType: LibraryItemType;
  title: string;
  description: string;
  imageUrl?: string; // Optional image for the card
  metadata?: string[];
  tags?: string[];
  dateAdded?: string;
  author?: string;
  onViewDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  className?: string;
}

const ItemTypeIcon: React.FC<{ type: LibraryItemType; className?: string }> = ({ type, className = "h-6 w-6" }) => {
  switch (type) {
    case 'document':
      return <FileText className={className} />;
    case 'video':
      return <Film className={className} />;
    case 'image':
      return <ImageIcon className={className} />;
    case 'audio':
      return <Music2 className={className} />;
    case 'link':
      return <LinkIcon className={className} />;
    case 'archive':
      return <Archive className={className} />;
    case 'collection':
      return <Star className={className} />; // Using Star for collection/favorites
    default:
      return <FileQuestion className={className} />;
  }
};

const LibraryItemPreview: React.FC<LibraryItemPreviewProps> = ({
  id,
  itemType,
  title,
  description,
  imageUrl,
  metadata,
  tags,
  dateAdded,
  author,
  onViewDetails,
  onEdit,
  className,
}) => {
  console.log(`LibraryItemPreview loaded for: ${title} (ID: ${id})`);

  return (
    <Card className={`w-full flex flex-col h-full overflow-hidden group ${className}`}>
      {imageUrl && (
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
           <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="capitalize">
              <ItemTypeIcon type={itemType} className="h-4 w-4 mr-1.5" />
              {itemType}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="pb-3">
        {!imageUrl && (
          <div className="flex items-center justify-between mb-2">
            <ItemTypeIcon type={itemType} className="h-8 w-8 text-gray-500" />
            <Badge variant="outline" className="capitalize">{itemType}</Badge>
          </div>
        )}
        <CardTitle className="text-lg font-semibold line-clamp-2 hover:text-blue-600 transition-colors">
          {onViewDetails ? (
            <button onClick={() => onViewDetails(id)} className="text-left w-full">
              {title}
            </button>
          ) : (
            title
          )}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-3 mt-1">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-3 space-y-2 flex-grow">
        {author && <p className="text-xs text-gray-500">By: {author}</p>}
        {dateAdded && <p className="text-xs text-gray-500">Added: {dateAdded}</p>}
        
        {metadata && metadata.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-600">Details:</h4>
            <ul className="list-disc list-inside pl-1">
              {metadata.map((meta, index) => (
                <li key={index} className="text-xs text-gray-500 truncate">{meta}</li>
              ))}
            </ul>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {(onViewDetails || onEdit) && (
        <CardFooter className="p-3 border-t bg-gray-50/50">
          <div className="flex w-full gap-2">
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onViewDetails(id)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(id)}
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default LibraryItemPreview;