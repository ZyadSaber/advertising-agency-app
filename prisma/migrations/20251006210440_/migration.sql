-- CreateTable
CREATE TABLE "public"."suppliers_information" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "supplier_phone" TEXT,
    "supplier_address" TEXT,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suppliers_information_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_information_supplier_name_key" ON "public"."suppliers_information"("supplier_name");
