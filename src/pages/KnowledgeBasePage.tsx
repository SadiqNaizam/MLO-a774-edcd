import React from 'react';
import { Link } from 'react-router-dom';
import KnowledgeBaseArticleDisplay from '@/components/KnowledgeBaseArticleDisplay';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, BookOpen, FileText, Library, PlusSquare } from 'lucide-react';

// Placeholder AppHeader component
const AppHeader: React.FC = () => (
  <header className="bg-slate-800 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
    <div className="flex items-center">
      <BookOpen className="h-6 w-6 mr-2" />
      <h1 className="text-xl font-semibold">Console App - Knowledge Base</h1>
    </div>
    <div className="text-sm">User: Alex Green</div> {/* Placeholder user */}
  </header>
);

// Placeholder AppSidebar component
const AppSidebar: React.FC = () => (
  <aside className="w-60 bg-slate-700 text-white p-5 space-y-3 flex flex-col sticky top-[64px] h-[calc(100vh-64px)]"> {/* Adjust top if header height changes */}
    <h2 className="text-lg font-semibold mb-2 text-slate-300">Navigation</h2>
    <nav className="flex-grow">
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="flex items-center p-2 rounded-md text-slate-200 hover:bg-slate-600 hover:text-white transition-colors">
            <Home className="h-4 w-4 mr-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/knowledge-base" className="flex items-center p-2 rounded-md text-slate-200 bg-slate-600 font-semibold hover:bg-slate-500 hover:text-white transition-colors"> {/* Active page style */}
            <FileText className="h-4 w-4 mr-2" /> Knowledge Base
          </Link>
        </li>
        <li>
          <Link to="/libraries" className="flex items-center p-2 rounded-md text-slate-200 hover:bg-slate-600 hover:text-white transition-colors">
            <Library className="h-4 w-4 mr-2" /> Libraries
          </Link>
        </li>
        <li>
          <Link to="/create-knowledge-base" className="flex items-center p-2 rounded-md text-slate-200 hover:bg-slate-600 hover:text-white transition-colors">
            <PlusSquare className="h-4 w-4 mr-2" /> Create KB Article
          </Link>
        </li>
      </ul>
    </nav>
    <div className="text-xs text-slate-400 mt-auto">Version 1.0.0</div>
  </aside>
);

// Placeholder AppFooter component
const AppFooter: React.FC = () => (
  <footer className="bg-slate-800 text-slate-300 p-4 text-center text-xs border-t border-slate-700">
    © {new Date().getFullYear()} Experience Studio Console App. All rights reserved.
  </footer>
);

// Placeholder TableOfContents component
interface TocItem {
  id: string;
  title: string;
  level: number;
  children?: TocItem[];
}

const TableOfContents: React.FC<{ items: TocItem[]; articleTitle: string }> = ({ items, articleTitle }) => (
  <div className="w-full p-4 bg-slate-50 border-l border-slate-200 h-full sticky top-[80px] overflow-y-auto rounded-lg shadow"> {/* Adjust top if header+breadcrumb height changes */}
    <h3 className="text-base font-semibold mb-3 text-slate-700">On this page: <span className="font-normal italic">{articleTitle}</span></h3>
    <ul className="space-y-1">
      {items.map(item => (
        <li key={item.id} className={`text-slate-600 hover:text-blue-600 transition-colors ${item.level === 1 ? 'font-medium' : ''}`} style={{ paddingLeft: `${(item.level -1) * 0.75}rem` }}>
          <a href={`#${item.id}`} className="block py-1 text-sm hover:underline">
            {item.title}
          </a>
          {item.children && item.children.length > 0 && (
             <ul className="space-y-0.5 mt-0.5">
                {item.children.map(child => (
                     <li key={child.id} className="text-slate-500 hover:text-blue-600 transition-colors" style={{ paddingLeft: `${(child.level -1) * 0.75}rem` }}>
                        <a href={`#${child.id}`} className="block py-0.5 text-xs hover:underline">
                            {child.title}
                        </a>
                    </li>
                ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const KnowledgeBasePage: React.FC = () => {
  console.log('KnowledgeBasePage loaded');

  const articleTitle = "Understanding the Console App Interface";
  const articleContent = `
    <h1 id="main-title" class="text-3xl font-bold mb-4 mt-0">Understanding the Console App Interface</h1>
    <p class="mb-4 text-gray-700 leading-relaxed">Welcome to the Console App! This document provides an overview of its main interface components and how to navigate them effectively.</p>
    
    <h2 id="dashboard-section" class="text-2xl font-semibold mb-3 mt-5 border-b pb-1">1. Main Dashboard</h2>
    <p class="mb-4 text-gray-700 leading-relaxed">The first screen you see after logging in. It provides quick access to your recent knowledge bases and libraries.</p>
    <img src="https://images.unsplash.com/photo-1587614203976-365c7d669a85?q=80&w=800&auto=format&fit=crop" alt="Dashboard Screenshot Example" class="rounded-md shadow-lg my-4 border" />
    
    <h2 id="kb-view-section" class="text-2xl font-semibold mb-3 mt-5 border-b pb-1">2. Knowledge Base View</h2>
    <p class="mb-4 text-gray-700 leading-relaxed">When you open a knowledge base, you'll see a list of articles. This section describes how to read and interact with them.</p>
    <ul class="list-disc ml-5 mb-4 text-gray-700 space-y-1">
      <li>Article navigation within a knowledge base.</li>
      <li>Integrated search functionality.</li>
      <li>Clean and readable content display area.</li>
    </ul>
    
    <h3 id="reading-article-subsection" class="text-xl font-semibold mb-2 mt-4">2.1. Reading an Article</h3>
    <p class="mb-4 text-gray-700 leading-relaxed">Articles are displayed in a clean, readable format. Use the table of contents for quick jumps to specific sections within the article.</p>
    
    <h2 id="libraries-section" class="text-2xl font-semibold mb-3 mt-5 border-b pb-1">3. Libraries</h2>
    <p class="mb-4 text-gray-700 leading-relaxed">Libraries store various assets like documents, images, and videos. You can browse and manage your assets here. Think of it as your digital resource hub.</p>
    
    <blockquote class="border-l-4 border-blue-500 pl-4 italic my-6 py-2 bg-blue-50 text-blue-700">
      This is an important note about data security and privacy within the Console App. Always ensure your assets are categorized correctly.
    </blockquote>
    
    <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm"><code class="language-javascript">// Sample code snippet for illustration
function greetUser(name) {
  console.log('Hello, ' + name + '!');
}
greetUser('Console App User');
    </code></pre>
    
    <h2 id="creating-content-section" class="text-2xl font-semibold mb-3 mt-5 border-b pb-1">4. Creating Content</h2>
    <p class="mb-4 text-gray-700 leading-relaxed">To create a new knowledge base article or upload to a library, look for the 'Create New' or '+' buttons available in respective sections. These are typically found in the sidebar or section headers.</p>
    <p class="mb-4 text-gray-700 leading-relaxed">For more details, refer to the <a href="/create-knowledge-base" class="text-blue-600 hover:underline">content creation guide</a>.</p>
  `;

  const tocItems: TocItem[] = [
    { id: 'dashboard-section', title: '1. Main Dashboard', level: 1 },
    { id: 'kb-view-section', title: '2. Knowledge Base View', level: 1, children: [
      { id: 'reading-article-subsection', title: '2.1. Reading an Article', level: 2 }
    ]},
    { id: 'libraries-section', title: '3. Libraries', level: 1 },
    { id: 'creating-content-section', title: '4. Creating Content', level: 1 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden"> {/* Flex container for sidebar and main content */}
        <AppSidebar />
        <ScrollArea className="flex-1 bg-slate-100"> {/* Main content scroll area */}
          <div className="p-6">
            <header className="mb-6 sticky top-0 bg-slate-100/80 backdrop-blur-sm py-3 z-40">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/dashboard" className="flex items-center text-slate-600 hover:text-slate-800">
                        <Home className="h-4 w-4 mr-1.5" /> Dashboard
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {/* Link to a generic KB listing page if it existed, or current page concept */}
                    <BreadcrumbLink asChild>
                        <Link to="/knowledge-base" className="flex items-center text-slate-600 hover:text-slate-800">
                            <FileText className="h-4 w-4 mr-1.5" /> Knowledge Base
                        </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-slate-700">{articleTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            
            <main className="flex flex-col lg:flex-row gap-x-8 gap-y-6">
              <div className="flex-grow lg:w-3/4 min-w-0"> {/* Ensure this div can shrink and grow */}
                <KnowledgeBaseArticleDisplay title={articleTitle} content={articleContent} />
              </div>
              <aside className="lg:w-1/4 lg:block hidden min-w-[250px]"> {/* TOC, hidden on smaller screens, min-width for larger screens */}
                <TableOfContents items={tocItems} articleTitle={articleTitle} />
              </aside>
            </main>
          </div>
        </ScrollArea>
      </div>
      <AppFooter />
    </div>
  );
};

export default KnowledgeBasePage;