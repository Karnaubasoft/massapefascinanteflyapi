/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_adminId_key" ON "City"("adminId");
