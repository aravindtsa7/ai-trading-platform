-- CreateTable
CREATE TABLE `brokers` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `brokerType` ENUM('UPSTOX', 'GROWW', 'FYERS') NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'DISCONNECTED', 'EXPIRED', 'ERROR') NOT NULL DEFAULT 'DISCONNECTED',
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `brokers_userId_idx`(`userId`),
    INDEX `brokers_brokerType_idx`(`brokerType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `broker_credentials` (
    `id` VARCHAR(191) NOT NULL,
    `brokerId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `clientSecret` VARCHAR(191) NULL,
    `accessToken` TEXT NULL,
    `refreshToken` TEXT NULL,
    `tokenExpiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `broker_credentials_brokerId_key`(`brokerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `brokers` ADD CONSTRAINT `brokers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `broker_credentials` ADD CONSTRAINT `broker_credentials_brokerId_fkey` FOREIGN KEY (`brokerId`) REFERENCES `brokers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
