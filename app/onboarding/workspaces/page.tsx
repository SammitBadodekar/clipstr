"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWorkspace } from "@/app/actions";
import { authClient } from "@/lib/auth";
import { capitalizeFirstLetter } from "better-auth/react";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Sparkles, Users } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Workspace name must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

const WorkspacePageSuspense = () => {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newWorkspace = searchParams.get("new");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isPending && !newWorkspace) {
      form.reset({
        name: `${capitalizeFirstLetter(session?.user?.name ?? "")}'s Workspace`,
        description: "",
      });
    }
  }, [session, isPending, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(createWorkspace(values.name, values.description ?? ""), {
      loading: "Creating workspace...",
      success: (data) => {
        router.push("/videos");
        return `Workspace created successfully`;
      },
      error: "An error occurred while creating the workspace, please try again",
      position: "top-center",
    });
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <Card className="w-full max-w-sm overflow-hidden md:max-w-3xl">
        <div className="grid p-0 md:grid-cols-2">
          <div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create Workspace</CardTitle>
              <CardDescription>Set up your new workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Workspace" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your workspace's visible name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your workspace"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A brief description of your workspace (optional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create Workspace
                  </Button>
                </form>
              </Form>
            </CardContent>
          </div>

          <div className="relative hidden bg-gradient-to-b from-green-100 to-green-50 p-6 md:flex md:flex-col md:items-center md:justify-center">
            {/* Decorative Elements */}
            <div className="absolute left-8 top-8 rounded-full bg-green-200 p-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="absolute right-12 top-24 rounded-full bg-green-200 p-4">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="absolute bottom-20 left-1/4 rounded-full bg-green-200 p-4">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>

            {/* Text Content */}
            <div className="mt-8 max-w-md text-center">
              <h2 className="text-2xl font-semibold text-green-900">
                Collaborate with your team
              </h2>
              <p className="mt-4 text-green-800">
                Create, share, and organize your video messages in one central
                workspace
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const WorkspacePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkspacePageSuspense />
    </Suspense>
  );
};

export default WorkspacePage;
