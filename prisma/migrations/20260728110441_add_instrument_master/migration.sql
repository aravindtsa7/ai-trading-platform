-- CreateTable
CREATE TABLE `Instrument` (
    `id` VARCHAR(191) NOT NULL,
    `exchange` VARCHAR(191) NOT NULL,
    `segment` VARCHAR(191) NOT NULL,
    `instrumentKey` VARCHAR(191) NOT NULL,
    `tradingSymbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `instrumentType` VARCHAR(191) NULL,
    `expiry` DATETIME(3) NULL,
    `strikePrice` DOUBLE NULL,
    `optionType` VARCHAR(191) NULL,
    `lotSize` INTEGER NULL,
    `tickSize` DOUBLE NULL,
    `isin` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Instrument_instrumentKey_key`(`instrumentKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
