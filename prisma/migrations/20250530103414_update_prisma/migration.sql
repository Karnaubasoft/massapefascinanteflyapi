/*
  Warnings:

  - A unique constraint covering the columns `[cityId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "cityId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_cityId_key" ON "Admin"("cityId");
