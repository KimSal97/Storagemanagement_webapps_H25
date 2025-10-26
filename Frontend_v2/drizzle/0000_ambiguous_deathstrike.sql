CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `name` TEXT NOT NULL,
  `email` TEXT NOT NULL UNIQUE,
  `password` TEXT NOT NULL
);

--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);