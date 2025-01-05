/*
  Warnings:

  - Added the required column `type` to the `Trek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trek" ADD COLUMN     "type" TEXT NOT NULL;
