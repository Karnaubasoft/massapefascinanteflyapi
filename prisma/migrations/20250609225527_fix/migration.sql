-- CreateTable
CREATE TABLE "TaxiDriver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photoURLs" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "workingDescription" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "TaxiDriver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaxiDriver_cityId_key" ON "TaxiDriver"("cityId");

-- AddForeignKey
ALTER TABLE "TaxiDriver" ADD CONSTRAINT "TaxiDriver_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
