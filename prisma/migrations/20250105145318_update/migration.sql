/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Trek` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trek_date_key" ON "Trek"("date");
