CREATE TABLE IF NOT EXISTS `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `suppliers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact_person` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`address` text,
	`status` text DEFAULT 'Aktiv' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`stock` integer,
	`min_stock` integer,
	`max_stock` integer,
	`price` real,
	`supplier` text NOT NULL,
	`location` text NOT NULL,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `order_items` (
    `id` text PRIMARY KEY NOT NULL,
    `order_id` text NOT NULL,
    `product_id` text NOT NULL,
    `product_name` text NOT NULL,
    `ordered_qty` integer NOT NULL,
    `unit_cost` real NOT NULL
);

--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`total_cost` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `password_resets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`quantity` integer NOT NULL,
	`sold_at` text NOT NULL,
	`created_by` text NOT NULL
);
