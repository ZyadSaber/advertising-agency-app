-- CreateTable
CREATE TABLE "public"."items_information" (
    "item_id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_information_pkey" PRIMARY KEY ("item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_information_item_name_key" ON "public"."items_information"("item_name");
