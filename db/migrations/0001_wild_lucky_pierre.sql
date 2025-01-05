CREATE TABLE "folder" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"workspaceId" text NOT NULL,
	"parentFolderId" text,
	"createdBy" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "related_videos" (
	"sourceVideoId" text NOT NULL,
	"relatedVideoId" text NOT NULL,
	"relationStrength" integer,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "related_videos_sourceVideoId_relatedVideoId_pk" PRIMARY KEY("sourceVideoId","relatedVideoId")
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"workspaceId" text NOT NULL,
	"folderId" text,
	"ownerId" text NOT NULL,
	"url" text NOT NULL,
	"thumbnailUrl" text,
	"duration" integer,
	"visibility" text NOT NULL,
	"size" integer,
	"status" text NOT NULL,
	"metadata" json,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_access" (
	"videoId" text NOT NULL,
	"userId" text NOT NULL,
	"accessType" text NOT NULL,
	"grantedBy" text NOT NULL,
	"grantedAt" timestamp NOT NULL,
	CONSTRAINT "video_access_videoId_userId_pk" PRIMARY KEY("videoId","userId")
);
--> statement-breakpoint
CREATE TABLE "video_comment" (
	"id" text PRIMARY KEY NOT NULL,
	"videoId" text NOT NULL,
	"userId" text NOT NULL,
	"content" text NOT NULL,
	"timestamp" integer,
	"parentCommentId" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_timestamp" (
	"id" text PRIMARY KEY NOT NULL,
	"videoId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"timestamp" integer NOT NULL,
	"createdBy" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_transcription" (
	"id" text PRIMARY KEY NOT NULL,
	"videoId" text NOT NULL,
	"content" text NOT NULL,
	"timestamp" integer NOT NULL,
	"duration" integer NOT NULL,
	"confidence" integer,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"ownerId" text NOT NULL,
	"logo" text,
	"settings" json,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace_member" (
	"workspaceId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text NOT NULL,
	"joinedAt" timestamp NOT NULL,
	"invitedBy" text,
	CONSTRAINT "workspace_member_workspaceId_userId_pk" PRIMARY KEY("workspaceId","userId")
);
--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_parentFolderId_folder_id_fk" FOREIGN KEY ("parentFolderId") REFERENCES "public"."folder"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "related_videos" ADD CONSTRAINT "related_videos_sourceVideoId_video_id_fk" FOREIGN KEY ("sourceVideoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "related_videos" ADD CONSTRAINT "related_videos_relatedVideoId_video_id_fk" FOREIGN KEY ("relatedVideoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_folderId_folder_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."folder"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_access" ADD CONSTRAINT "video_access_videoId_video_id_fk" FOREIGN KEY ("videoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_access" ADD CONSTRAINT "video_access_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_access" ADD CONSTRAINT "video_access_grantedBy_user_id_fk" FOREIGN KEY ("grantedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_comment" ADD CONSTRAINT "video_comment_videoId_video_id_fk" FOREIGN KEY ("videoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_comment" ADD CONSTRAINT "video_comment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_comment" ADD CONSTRAINT "video_comment_parentCommentId_video_comment_id_fk" FOREIGN KEY ("parentCommentId") REFERENCES "public"."video_comment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_timestamp" ADD CONSTRAINT "video_timestamp_videoId_video_id_fk" FOREIGN KEY ("videoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_timestamp" ADD CONSTRAINT "video_timestamp_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_transcription" ADD CONSTRAINT "video_transcription_videoId_video_id_fk" FOREIGN KEY ("videoId") REFERENCES "public"."video"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_invitedBy_user_id_fk" FOREIGN KEY ("invitedBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;