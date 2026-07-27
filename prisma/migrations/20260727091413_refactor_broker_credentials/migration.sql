/*
  Warnings:

  - You are about to drop the column `clientId` on the `broker_credentials` table. All the data in the column will be lost.
  - You are about to drop the column `clientSecret` on the `broker_credentials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `broker_credentials` DROP COLUMN `clientId`,
    DROP COLUMN `clientSecret`,
    ADD COLUMN `brokerUserId` VARCHAR(191) NULL;
