CREATE TABLE `auth_credentials` (
	`user_id` char(36) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`password_updated_at` datetime(3) NOT NULL,
	`failed_attempt_count` int NOT NULL DEFAULT 0,
	`locked_until` datetime(3),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `auth_credentials_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `auth_sessions` (
	`id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`token_hash` char(64) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`last_seen_at` datetime(3) NOT NULL,
	`idle_expires_at` datetime(3) NOT NULL,
	`absolute_expires_at` datetime(3) NOT NULL,
	`revoked_at` datetime(3),
	`revocation_reason` varchar(64),
	CONSTRAINT `auth_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `auth_sessions_token_hash_uidx` UNIQUE(`token_hash`)
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`id` char(36) NOT NULL,
	`membership_id` char(36) NOT NULL,
	`learning_path_id` varchar(64) NOT NULL,
	`lesson_id` varchar(64) NOT NULL,
	`content_revision` varchar(64) NOT NULL,
	`status` enum('in_progress','completed') NOT NULL,
	`source` enum('pilot_runtime','local_import') NOT NULL,
	`started_at` datetime(3) NOT NULL,
	`completed_at` datetime(3),
	`last_activity_at` datetime(3) NOT NULL,
	`version` int NOT NULL DEFAULT 1,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `lesson_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `lesson_progress_membership_path_lesson_uidx` UNIQUE(`membership_id`,`learning_path_id`,`lesson_id`)
);
--> statement-breakpoint
CREATE TABLE `local_progress_imports` (
	`id` char(36) NOT NULL,
	`membership_id` char(36) NOT NULL,
	`client_snapshot_hash` char(64) NOT NULL,
	`imported_lesson_count` int NOT NULL,
	`idempotency_key` varchar(128) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	CONSTRAINT `local_progress_imports_id` PRIMARY KEY(`id`),
	CONSTRAINT `local_progress_imports_membership_idempotency_uidx` UNIQUE(`membership_id`,`idempotency_key`),
	CONSTRAINT `local_progress_imports_membership_snapshot_uidx` UNIQUE(`membership_id`,`client_snapshot_hash`)
);
--> statement-breakpoint
CREATE TABLE `pilot_cohorts` (
	`id` char(36) NOT NULL,
	`code` varchar(64) NOT NULL,
	`title` varchar(200) NOT NULL,
	`status` enum('draft','active','closed','archived') NOT NULL DEFAULT 'draft',
	`starts_at` datetime(3) NOT NULL,
	`ends_at` datetime(3) NOT NULL,
	`learning_path_id` varchar(64) NOT NULL,
	`retention_delete_after` datetime(3) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `pilot_cohorts_id` PRIMARY KEY(`id`),
	CONSTRAINT `pilot_cohorts_code_uidx` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `pilot_invitations` (
	`id` char(36) NOT NULL,
	`cohort_id` char(36) NOT NULL,
	`email_normalized` varchar(320) NOT NULL,
	`token_hash` char(64) NOT NULL,
	`expires_at` datetime(3) NOT NULL,
	`redeemed_at` datetime(3),
	`redeemed_user_id` char(36),
	`revoked_at` datetime(3),
	`created_at` datetime(3) NOT NULL,
	`created_by_user_id` char(36),
	CONSTRAINT `pilot_invitations_id` PRIMARY KEY(`id`),
	CONSTRAINT `pilot_invitations_token_hash_uidx` UNIQUE(`token_hash`)
);
--> statement-breakpoint
CREATE TABLE `pilot_memberships` (
	`id` char(36) NOT NULL,
	`cohort_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`role` enum('learner','pilot_admin') NOT NULL,
	`status` enum('active','suspended','ended') NOT NULL DEFAULT 'active',
	`joined_at` datetime(3) NOT NULL,
	`ended_at` datetime(3),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`active_scope_user_id` char(36) GENERATED ALWAYS AS (CASE WHEN `status` IN ('active', 'suspended') THEN `user_id` ELSE NULL END) STORED,
	CONSTRAINT `pilot_memberships_id` PRIMARY KEY(`id`),
	CONSTRAINT `pilot_memberships_cohort_user_uidx` UNIQUE(`cohort_id`,`user_id`),
	CONSTRAINT `pilot_memberships_active_scope_user_uidx` UNIQUE(`active_scope_user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` char(36) NOT NULL,
	`email_normalized` varchar(320),
	`email_display` varchar(320),
	`status` enum('active','suspended','pending_deletion','deidentified') NOT NULL DEFAULT 'active',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_normalized_uidx` UNIQUE(`email_normalized`)
);
--> statement-breakpoint
ALTER TABLE `auth_credentials` ADD CONSTRAINT `auth_credentials_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `auth_sessions` ADD CONSTRAINT `auth_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `lesson_progress` ADD CONSTRAINT `lesson_progress_membership_id_pilot_memberships_id_fk` FOREIGN KEY (`membership_id`) REFERENCES `pilot_memberships`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `local_progress_imports` ADD CONSTRAINT `local_progress_imports_membership_id_pilot_memberships_id_fk` FOREIGN KEY (`membership_id`) REFERENCES `pilot_memberships`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `pilot_invitations` ADD CONSTRAINT `pilot_invitations_cohort_id_pilot_cohorts_id_fk` FOREIGN KEY (`cohort_id`) REFERENCES `pilot_cohorts`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `pilot_invitations` ADD CONSTRAINT `pilot_invitations_redeemed_user_id_users_id_fk` FOREIGN KEY (`redeemed_user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `pilot_invitations` ADD CONSTRAINT `pilot_invitations_created_by_user_id_users_id_fk` FOREIGN KEY (`created_by_user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `pilot_memberships` ADD CONSTRAINT `pilot_memberships_cohort_id_pilot_cohorts_id_fk` FOREIGN KEY (`cohort_id`) REFERENCES `pilot_cohorts`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `pilot_memberships` ADD CONSTRAINT `pilot_memberships_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX `auth_sessions_user_id_idx` ON `auth_sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `auth_sessions_idle_expires_at_idx` ON `auth_sessions` (`idle_expires_at`);--> statement-breakpoint
CREATE INDEX `auth_sessions_absolute_expires_at_idx` ON `auth_sessions` (`absolute_expires_at`);--> statement-breakpoint
CREATE INDEX `lesson_progress_membership_id_idx` ON `lesson_progress` (`membership_id`);--> statement-breakpoint
CREATE INDEX `lesson_progress_status_idx` ON `lesson_progress` (`status`);--> statement-breakpoint
CREATE INDEX `local_progress_imports_membership_id_idx` ON `local_progress_imports` (`membership_id`);--> statement-breakpoint
CREATE INDEX `pilot_cohorts_status_idx` ON `pilot_cohorts` (`status`);--> statement-breakpoint
CREATE INDEX `pilot_invitations_cohort_id_idx` ON `pilot_invitations` (`cohort_id`);--> statement-breakpoint
CREATE INDEX `pilot_invitations_expires_at_idx` ON `pilot_invitations` (`expires_at`);--> statement-breakpoint
CREATE INDEX `pilot_memberships_user_id_idx` ON `pilot_memberships` (`user_id`);--> statement-breakpoint
CREATE INDEX `pilot_memberships_status_idx` ON `pilot_memberships` (`status`);--> statement-breakpoint
CREATE INDEX `users_status_idx` ON `users` (`status`);