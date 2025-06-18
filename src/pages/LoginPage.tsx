import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AppWindow } from 'lucide-react'; // Icon for placeholder header

// Placeholder for AppHeader
const AppHeaderPlaceholder: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-md">
      <div className="container mx-auto flex items-center">
        <AppWindow className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-semibold">Console App</h1>
      </div>
    </header>
  );
};

// Placeholder for AppFooter
const AppFooterPlaceholder: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto text-center text-sm text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} Experience Studio. All rights reserved.
        <a href="/privacy" className="ml-4 hover:underline">Privacy Policy</a>
        <a href="/terms" className="ml-4 hover:underline">Terms of Service</a>
      </div>
    </footer>
  );
};

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    // Simulate API call or authentication logic
    console.log("Login form submitted:", values);
    // For this example, we'll just navigate to the dashboard.
    // In a real app, you would handle authentication tokens, user state, etc.
    alert(`Mock Login Success! Email: ${values.email}`);
    navigate('/dashboard'); // Navigate to dashboard as per App.tsx
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-gray-200 to-slate-300 dark:from-slate-900 dark:via-gray-800 dark:to-slate-950 p-4 pt-20 pb-20"> {/* Added padding top/bottom for header/footer */}
      <AppHeaderPlaceholder />

      <Card className="w-full max-w-md shadow-2xl bg-white dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your credentials to access your Console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        {...field} 
                        className="bg-white/70 dark:bg-slate-700/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-white/70 dark:bg-slate-700/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p>
            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Forgot your password?
            </a>
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>

      <AppFooterPlaceholder />
    </div>
  );
};

export default LoginPage;