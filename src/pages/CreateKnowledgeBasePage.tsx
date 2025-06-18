import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// Assumed custom layout components (paths are assumptions based on common practices)
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import AppFooter from '@/components/AppFooter';

// Shadcn/ui components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the form schema using Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.string().optional(), // e.g., "tech, guide, setup"
});

type FormValues = z.infer<typeof formSchema>;

const CreateKnowledgeBasePage = () => {
  console.log('CreateKnowledgeBasePage loaded');
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: "",
    },
  });

  function onSubmit(values: FormValues) {
    // Simulate API call
    console.log("Form submitted:", values);
    toast.success("Knowledge base article created successfully!", {
      description: `Title: ${values.title}`,
    });
    // Navigate to the knowledge base page or dashboard after successful creation
    // Path "/knowledge-base" is from App.tsx
    navigate('/knowledge-base');
  }

  const handleCancel = () => {
    // Path "/dashboard" is from App.tsx
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader /> {/* Assumed custom component */}
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar /> {/* Assumed custom component */}
        <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8">
          <main className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Create New Knowledge Base Article</CardTitle>
                <FormDescription>
                  Fill in the details below to create a new article.
                </FormDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Article Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter article title" {...field} />
                          </FormControl>
                          <FormDescription>
                            A clear and concise title for your article.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="technical-guide">Technical Guide</SelectItem>
                              <SelectItem value="faq">FAQ</SelectItem>
                              <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                              <SelectItem value="product-update">Product Update</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the most relevant category for this article.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Article Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your article content here..."
                              className="min-h-[200px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The main body of your article. Markdown is not supported by default in a plain textarea.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., setup, configuration, new-feature" {...field} />
                          </FormControl>
                          <FormDescription>
                            Comma-separated tags to help users find this article.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save Article"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </div>
      <AppFooter /> {/* Assumed custom component */}
    </div>
  );
};

export default CreateKnowledgeBasePage;