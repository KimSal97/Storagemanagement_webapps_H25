CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`stock` integer,
	`min_stock` integer,
	`price` real,
	`supplier` text NOT NULL,
	`location` text NOT NULL,
	`image` text
);
