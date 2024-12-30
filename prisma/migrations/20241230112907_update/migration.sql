/*
  Warnings:

  - A unique constraint covering the columns `[account]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "account" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
