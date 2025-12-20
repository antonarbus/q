CREATE TABLE "bookmarks" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"type" text,
	"name" text,
	"category" text,
	"desc" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "email_idx" ON "bookmarks" USING btree ("email");