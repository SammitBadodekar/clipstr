import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  primaryKey,
  json,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const workspace = pgTable("workspace", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: text("ownerId")
    .notNull()
    .references(() => user.id),
  logo: text("logo"),
  settings: json("settings"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const workspaceMember = pgTable(
  "workspace_member",
  {
    workspaceId: text("workspaceId")
      .notNull()
      .references(() => workspace.id),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    role: text("role").notNull(), // 'admin', 'member', etc.
    joinedAt: timestamp("joinedAt").notNull(),
    invitedBy: text("invitedBy").references(() => user.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.workspaceId, table.userId] }),
  }),
);

export const folder = pgTable("folder", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  workspaceId: text("workspaceId")
    .notNull()
    .references(() => workspace.id),
  parentFolderId: text("parentFolderId").references(
    (): AnyPgColumn => folder.id, // Self-referencing foreign key
  ),
  createdBy: text("createdBy")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const video = pgTable("video", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  workspaceId: text("workspaceId")
    .notNull()
    .references(() => workspace.id),
  folderId: text("folderId").references(() => folder.id),
  ownerId: text("ownerId")
    .notNull()
    .references(() => user.id),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  duration: integer("duration"),
  visibility: text("visibility").notNull(),
  size: integer("size"),
  status: text("status").notNull(),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const videoAccess = pgTable(
  "video_access",
  {
    videoId: text("videoId")
      .notNull()
      .references(() => video.id),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    accessType: text("accessType").notNull(), // 'view', 'edit', etc.
    grantedBy: text("grantedBy")
      .notNull()
      .references(() => user.id),
    grantedAt: timestamp("grantedAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.videoId, table.userId] }),
  }),
);

export const videoComment = pgTable("video_comment", {
  id: text("id").primaryKey(),
  videoId: text("videoId")
    .notNull()
    .references(() => video.id),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  timestamp: integer("timestamp"), // Video timestamp in seconds
  parentCommentId: text("parentCommentId").references(
    (): AnyPgColumn => videoComment.id,
  ), // For nested comments
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const videoTranscription = pgTable("video_transcription", {
  id: text("id").primaryKey(),
  videoId: text("videoId")
    .notNull()
    .references(() => video.id),
  content: text("content").notNull(),
  timestamp: integer("timestamp").notNull(), // Start time in seconds
  duration: integer("duration").notNull(), // Duration in seconds
  confidence: integer("confidence"), // Transcription confidence score
  createdAt: timestamp("createdAt").notNull(),
});

export const videoTimestamp = pgTable("video_timestamp", {
  id: text("id").primaryKey(),
  videoId: text("videoId")
    .notNull()
    .references(() => video.id),
  title: text("title").notNull(),
  description: text("description"),
  timestamp: integer("timestamp").notNull(),
  createdBy: text("createdBy")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const relatedVideos = pgTable(
  "related_videos",
  {
    sourceVideoId: text("sourceVideoId")
      .notNull()
      .references(() => video.id),
    relatedVideoId: text("relatedVideoId")
      .notNull()
      .references(() => video.id),
    relationStrength: integer("relationStrength"), // Optional: for ranking related videos
    createdAt: timestamp("createdAt").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.sourceVideoId, table.relatedVideoId] }),
  }),
);
