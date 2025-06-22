/*
  Warnings:

  - You are about to drop the column `photoURL` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[location]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PhotoEntityType" AS ENUM ('city', 'place', 'event');

-- DropIndex
DROP INDEX "City_name_key";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "photoURL";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "photoURL";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "photoURL";

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cityId" TEXT,
    "placeId" TEXT,
    "eventId" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_location_key" ON "City"("location");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
