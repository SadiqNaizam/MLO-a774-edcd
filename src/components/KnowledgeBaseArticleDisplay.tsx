import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KnowledgeBaseArticleDisplayProps {
  title: string;
  content: string; // HTML content of the article
  //  Optional: lastUpdated?: string;
  //  Optional: author?: string;
}

const KnowledgeBaseArticleDisplay: React.FC<KnowledgeBaseArticleDisplayProps> = ({
  title,
  content,
}) => {
  console.log('KnowledgeBaseArticleDisplay loaded for article:', title);

  // Basic styling for HTML elements rendered via dangerouslySetInnerHTML.
  // A more robust solution might involve a Markdown parser or a dedicated HTML styling library/plugin.
  const contentStyles = `
    prose-sm sm:prose lg:prose-lg xl:prose-xl 
    max-w-none 
    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 
    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5 
    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
    [&_p]:mb-4 [&_p]:leading-relaxed
    [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-4 [&_ul_li]:mb-1
    [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-4 [&_ol_li]:mb-1
    [&_a]:text-blue-600 [&_a]:hover:underline
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md [&_img]:my-4 [&_img]:shadow-md
    [&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:my-4
    [&_code]:font-mono [&_code]:text-sm
    [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:dark:border-gray-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4
    [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
    [&_th]:border [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:dark:bg-gray-700
    [&_td]:border [&_td]:p-2
  `;

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
        {/* Potential place for metadata like author, date */}
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-6">
          {/* 
            SECURITY WARNING: Using dangerouslySetInnerHTML can be risky if the content
            is not properly sanitized. Ensure that the 'content' prop is trusted HTML
            or sanitized before being passed to this component.
          */}
          <div
            className={contentStyles}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseArticleDisplay;