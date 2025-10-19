-- CreateTable
CREATE TABLE "public"."customers_information" (
    "customer_id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_phone" TEXT,
    "customer_address" TEXT,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_information_pkey" PRIMARY KEY ("customer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_information_customer_name_key" ON "public"."customers_information"("customer_name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_information_customer_phone_key" ON "public"."customers_information"("customer_phone");
