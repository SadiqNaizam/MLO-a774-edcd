import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Library, BookOpen, PlusCircle, LogOut, Settings, UserCircle } from 'lucide-react';

// Placeholder for AppHeader
const AppHeader: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/dashboard" className="text-xl font-bold hover:text-gray-300">
          Console App
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-700">
          <Settings className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700">
          <UserCircle className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

// Placeholder for AppSidebar
const AppSidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home className="mr-3 h-5 w-5" /> },
    { label: 'Knowledge Base', href: '/knowledge-base', icon: <BookOpen className="mr-3 h-5 w-5" /> },
    { label: 'Libraries', href: '/libraries', icon: <Library className="mr-3 h-5 w-5" /> },
    { label: 'Create New KB', href: '/create-knowledge-base', icon: <PlusCircle className="mr-3 h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 p-4 space-y-6 flex flex-col h-full fixed top-0 left-0 pt-[calc(4rem+1px)]"> {/* Adjust pt to match header height */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="flex items-center py-2 px-3 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-150"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Link
          to="/" // LoginPage is at root
          className="flex items-center py-2 px-3 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-150 mt-auto"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
};

// Placeholder for AppFooter
const AppFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 text-sm shadow-md">
      &copy; {new Date().getFullYear()} Experience Studio Console. All rights reserved.
    </footer>
  );
};


const DashboardPage = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <AppHeader />
      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0"> {/* Placeholder for sidebar width */}
            <AppSidebar />
        </div>
        <main className="flex-1 ml-64"> {/* Adjust ml to match sidebar width */}
            <ScrollArea className="h-[calc(100vh-4rem-3rem)]"> {/* Adjust height for header and footer */}
                <div className="p-6 space-y-6">
                    {/* Heading and Text components implemented as h1/p */}
                    <section>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome to Your Console</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your knowledge bases and libraries efficiently.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BookOpen className="mr-2 h-6 w-6 text-blue-500" />
                                    Knowledge Bases
                                </CardTitle>
                                <CardDescription>
                                    Access, create, and manage your knowledge base articles.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Keep your information organized and easily accessible.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link to="/knowledge-base" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        View Knowledge Bases
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Library className="mr-2 h-6 w-6 text-green-500" />
                                    Libraries
                                </CardTitle>
                                <CardDescription>
                                    Explore and manage your digital asset libraries.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Store and categorize documents, images, videos, and more.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Link to="/libraries" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        Go to Libraries
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow bg-blue-50 dark:bg-blue-900/30 border-blue-500">
                            <CardHeader>
                                <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                                    <PlusCircle className="mr-2 h-6 w-6" />
                                    Quick Actions
                                </CardTitle>
                                <CardDescription className="dark:text-blue-400">
                                   Start creating new content right away.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <Link to="/create-knowledge-base" className="w-full">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        Create New Knowledge Base
                                    </Button>
                                </Link>
                            </CardContent>
                             <CardFooter>
                                <p className="text-xs text-gray-500 dark:text-gray-400">More actions coming soon...</p>
                            </CardFooter>
                        </Card>
                    </section>

                     <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Recent Activity</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-gray-500 dark:text-gray-400">
                                    No recent activity to display. Check back later!
                                    {/* This could be dynamically populated in a real application */}
                                </p>
                            </CardContent>
                        </Card>
                    </section>
                </div>
                <AppFooter />
            </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;