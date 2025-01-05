"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Camera, Github, MessageCircle, Video } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <div className="grid p-0 md:grid-cols-2">
          <div>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                <div>Login with your Google or Github account</div>
              </CardDescription>
            </CardHeader>
            <div className="grid gap-6 p-12 pb-48">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    const data = await signIn.social({
                      provider: "google",
                    });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  Login with Github
                </Button>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden bg-gradient-to-b from-green-100 to-green-50 md:flex">
            <div className="relative flex w-full flex-col items-center justify-center px-8">
              {/* Decorative Icons */}
              <div className="absolute left-12 top-12 rounded-full bg-green-200 p-4">
                <Camera className="h-6 w-6 text-green-600" />
              </div>
              <div className="absolute right-12 top-20 rounded-full bg-green-200 p-4">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div className="absolute bottom-12 left-1/4 rounded-full bg-green-200 p-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>

              {/* Text Content */}
              <div className="z-10 mt-8 max-w-md text-center">
                <h2 className="text-2xl font-semibold text-green-900">
                  Record and share videos effortlessly
                </h2>
                <p className="mt-4 text-green-800">
                  Communicate more effectively with quick video messages that
                  save you time and keep your team aligned
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
