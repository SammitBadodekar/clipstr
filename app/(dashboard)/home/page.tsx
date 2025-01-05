import Link from "next/link";
import { Plus, Video, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VideosPage() {
  const videos: { id: string; title: string; createdAt: string }[] = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Videos</h1>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Record new video
        </Button>
      </div>

      {videos.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold">No videos yet</h2>
            <p className="mb-6 text-muted-foreground">
              Record and share videos with your team. Get started by recording
              your first video.
            </p>
            <Button size="lg" className="mx-auto">
              <Plus className="mr-2 h-4 w-4" />
              Record your first video
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Link key={video.id} href={`/videos/${video.id}`}>
              <Card className="overflow-hidden transition-all hover:ring-2 hover:ring-primary/50">
                <div className="group relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="secondary" size="icon">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-medium">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
