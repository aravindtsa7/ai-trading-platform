-- AlterTable
ALTER TABLE `instrument` ADD COLUMN `exchangeToken` VARCHAR(191) NULL,
    ADD COLUMN `freezeQuantity` INTEGER NULL,
    ADD COLUMN `minimumLot` INTEGER NULL,
    ADD COLUMN `status` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Instrument_tradingSymbol_idx` ON `Instrument`(`tradingSymbol`);

-- CreateIndex
CREATE INDEX `Instrument_name_idx` ON `Instrument`(`name`);

-- CreateIndex
CREATE INDEX `Instrument_exchange_idx` ON `Instrument`(`exchange`);

-- CreateIndex
CREATE INDEX `Instrument_segment_idx` ON `Instrument`(`segment`);

-- CreateIndex
CREATE INDEX `Instrument_expiry_idx` ON `Instrument`(`expiry`);
