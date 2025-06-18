import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LibraryItemPreview, { LibraryItemType } from '@/components/LibraryItemPreview';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Library, LayoutDashboard, BookOpen, PlusSquare, LogOut } from 'lucide-react';

// Placeholder for AppHeader component
const AppHeader: React.FC = () => (
  <header className="bg-slate-800 dark:bg-gray-900 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
    <div className="flex items-center">
      <Library className="h-6 w-6 mr-2" />
      <h1 className="text-xl font-semibold">Console App - Libraries</h1>
    </div>
    <div className="flex items-center space-x-4">
      {/* Placeholder for user menu or theme toggle */}
      <Button variant="ghost" size="icon">
        <UserIcon className="h-5 w-5" /> {/* Assuming a UserIcon exists or is imported */}
      </Button>
    </div>
  </header>
);

// Placeholder UserIcon if not available from lucide-react directly or meant to be generic
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);


// Placeholder for AppSidebar component
const AppSidebar: React.FC<{ currentPagePath: string }> = ({ currentPagePath }) => {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" /> },
    { path: "/knowledge-base", label: "Knowledge Base", icon: <BookOpen className="mr-2 h-4 w-4" /> },
    { path: "/create-knowledge-base", label: "Create KB Article", icon: <PlusSquare className="mr-2 h-4 w-4" /> },
    { path: "/libraries", label: "Libraries", icon: <Library className="mr-2 h-4 w-4" /> },
    { path: "/", label: "Logout", icon: <LogOut className="mr-2 h-4 w-4" /> }, // Assuming '/' is login page
  ];

  return (
    <aside className="w-64 bg-slate-700 dark:bg-gray-800 text-white p-4 space-y-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <nav className="flex flex-col space-y-1">
        {navItems.map(item => (
          <Button
            key={item.path}
            variant={currentPagePath === item.path ? "secondary" : "ghost"}
            className="w-full justify-start text-left text-white hover:bg-slate-600 dark:hover:bg-gray-700"
            asChild
          >
            <Link to={item.path}>{item.icon}{item.label}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

// Placeholder for AppFooter component
const AppFooter: React.FC = () => (
  <footer className="bg-slate-800 dark:bg-gray-900 text-white p-3 text-center text-xs border-t border-slate-700 dark:border-gray-700">
    © {new Date().getFullYear()} Experience Studio Console. All rights reserved.
  </footer>
);

const sampleLibraryItems: Array<Omit<React.ComponentProps<typeof LibraryItemPreview>, 'onViewDetails' | 'onEdit'>> = [
  { id: '1', itemType: 'document' as LibraryItemType, title: "Annual Report 2023", description: "Comprehensive overview of company performance in 2023.", imageUrl: "https://images.unsplash.com/photo-1583521268328-c60fc02f05c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", tags: ["finance", "report", "annual"], dateAdded: "2024-01-15", author: "Finance Team", metadata: ["PDF", "3.5MB", "Internal"] },
  { id: '2', itemType: 'video' as LibraryItemType, title: "Product Demo Video", description: "A short video showcasing the new product features.", imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZpZGVvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", tags: ["product", "demo", "marketing"], dateAdded: "2024-02-01", author: "Marketing Dept.", metadata: ["MP4", "10:32min", "Public"] },
  { id: '3', itemType: 'image' as LibraryItemType, title: "Team Offsite Photos", description: "Collection of photos from the recent team offsite event.", imageUrl: "https://images.unsplash.com/photo-1505238680356-667803448bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVhbSUyMG9mZnNpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", tags: ["team", "event", "photos"], dateAdded: "2024-03-10", author: "HR Dept.", metadata: ["JPEG Collection", "High-Res"] },
  { id: '4', itemType: 'audio' as LibraryItemType, title: "CEO Townhall Q1", description: "Recording of the first quarter townhall meeting with the CEO.", imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXVkaW8lMjByZWNvcmRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", tags: ["townhall", "ceo", "internal"], dateAdded: "2024-03-20", author: "Internal Comms", metadata: ["MP3", "45:12min"] },
  { id: '5', itemType: 'link' as LibraryItemType, title: "Competitor Analysis Dashboard", description: "Link to the live competitor analysis dashboard.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60", tags: ["analysis", "competitor", "strategy"], dateAdded: "2024-04-01", author: "Strategy Team", metadata: ["External Link", "Real-time Data"] },
  { id: '6', itemType: 'archive' as LibraryItemType, title: "Project Alpha Archive", description: "Archived files and documents for Project Alpha.", imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjaGl2ZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60", tags: ["archive", "project alpha", "legacy"], dateAdded: "2023-12-01", author: "Project Team", metadata: ["ZIP", "250MB"] },
  { id: '7', itemType: 'collection' as LibraryItemType, title: "Onboarding Materials", description: "A collection of resources for new hires.", imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25ib2FyZGluZ3xlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60", tags: ["onboarding", "hr", "new hires"], dateAdded: "2024-01-05", author: "HR Dept.", metadata: ["Multiple file types"] },
  { id: '8', itemType: 'document' as LibraryItemType, title: "Marketing Campaign Plan Q3", description: "Detailed plan for Q3 marketing campaigns.", imageUrl: "https://images.unsplash.com/photo-1533750349088-2433075c6501?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFya2V0aW5nJTIwcGxhbnxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=500&q=60", tags: ["marketing", "plan", "q3"], dateAdded: "2024-05-10", author: "Marketing Dept." },
];

const ITEMS_PER_PAGE = 6;

const LibrariesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log('LibrariesPage loaded');
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return sampleLibraryItems;
    return sampleLibraryItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tags && item.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleViewDetails = (id: string) => {
    console.log("View details for item:", id);
    // Navigate to item detail page or open a modal
  };

  const handleEditItem = (id: string) => {
    console.log("Edit item:", id);
    // Navigate to item edit page or open an edit modal
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-gray-950">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar currentPagePath="/libraries" />
        <ScrollArea className="flex-1 p-4 md:p-6 bg-slate-50 dark:bg-gray-900">
          <main className="max-w-7xl mx-auto">
            <section aria-labelledby="libraries-title" className="mb-6">
              <h2 id="libraries-title" className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Resource Libraries
              </h2>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="relative flex-grow w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search libraries (title, description, tags...)"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 w-full"
                    aria-label="Search libraries"
                  />
                </div>
                <Button onClick={() => setSearchTerm('')} variant="outline" className="w-full sm:w-auto">
                  Clear Search
                </Button>
              </div>
            </section>

            {paginatedItems.length > 0 ? (
              <section aria-label="Library items grid">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {paginatedItems.map(item => (
                    <LibraryItemPreview
                      key={item.id}
                      {...item}
                      onViewDetails={handleViewDetails}
                      onEdit={handleEditItem}
                      className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"
                    />
                  ))}
                </div>
              </section>
            ) : (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                <Library className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-xl font-semibold">No library items found.</p>
                {searchTerm && <p>Try adjusting your search terms.</p>}
              </div>
            )}

            {totalPages > 1 && (
              <section aria-label="Pagination" className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                        aria-disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Basic pagination display logic: show first, last, current, and nearby pages
                      const showPage = pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) <= 1 ||
                                       (currentPage <= 3 && pageNum <= 3) || (currentPage >= totalPages - 2 && pageNum >= totalPages -2);
                      const showEllipsisBefore = currentPage > 3 && pageNum === currentPage - 2 && pageNum !== 1;
                      const showEllipsisAfter = currentPage < totalPages - 2 && pageNum === currentPage + 2 && pageNum !== totalPages;
                      
                      if (showEllipsisBefore) {
                        return <PaginationItem key={`ellipsis-start-${pageNum}`}><PaginationEllipsis /></PaginationItem>;
                      }
                      if (showPage) {
                         return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => { e.preventDefault(); handlePageChange(pageNum); }}
                              isActive={currentPage === pageNum}
                              aria-current={currentPage === pageNum ? "page" : undefined}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (showEllipsisAfter) {
                        return <PaginationItem key={`ellipsis-end-${pageNum}`}><PaginationEllipsis /></PaginationItem>;
                      }
                      return null;
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                        aria-disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </section>
            )}
          </main>
        </ScrollArea>
      </div>
      <AppFooter />
    </div>
  );
};

export default LibrariesPage;