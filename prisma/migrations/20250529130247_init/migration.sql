/*
  Warnings:

  - The values [restaurant,hotel,tourist_attractions] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('RESTAURANT', 'HOTEL', 'TOURIST_ATTRACTIONS', 'LANDSCAPE');
ALTER TABLE "Place" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "authorized" BOOLEAN NOT NULL DEFAULT false;
