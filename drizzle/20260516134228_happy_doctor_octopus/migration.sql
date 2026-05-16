CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" varchar(8) PRIMARY KEY,
	"email" varchar(320) NOT NULL,
	"type" varchar(128) NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"category" varchar(100) DEFAULT '' NOT NULL,
	"desc" varchar(2000) DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" varchar(8) PRIMARY KEY,
	"email" varchar(320) NOT NULL,
	"uploadedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"size" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quotations" (
	"id" varchar(8) PRIMARY KEY,
	"email" varchar(320) NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"category" varchar(100) DEFAULT '' NOT NULL,
	"desc" varchar(2000) DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"openedAt" timestamp with time zone,
	"viewedAt" timestamp with time zone,
	"access" jsonb DEFAULT '{"level":"nobody","userList":[]}' NOT NULL,
	"paidAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"email" varchar(320) PRIMARY KEY,
	"password" varchar(255) NOT NULL,
	"roles" varchar(50)[] DEFAULT '{user}'::varchar(50)[] NOT NULL,
	"isActivated" boolean DEFAULT false NOT NULL,
	"activationKey" varchar(255),
	"resetPasswordKey" varchar(255),
	"refreshJwtToken" varchar(500) DEFAULT 'incorrect token' NOT NULL,
	"registeredAt" timestamp with time zone DEFAULT now() NOT NULL,
	"loggedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"stripeAccountId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visitors" (
	"visitedAt" date PRIMARY KEY,
	"totalCount" integer DEFAULT 0 NOT NULL,
	"newCount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "subscriptionExpiresAt" timestamp with time zone;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "bookmarks" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "files_email_idx" ON "files" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "files_id_idx" ON "files" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quotations_email_idx" ON "quotations" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quotations_id_idx" ON "quotations" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
