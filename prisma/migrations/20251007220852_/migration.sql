-- CreateTable
CREATE TABLE "public"."purchase_invoice" (
    "invoice_no" SERIAL NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "invoice_notes" TEXT,
    "supplier_id" INTEGER NOT NULL,
    "total_invoice" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30),
    "total_after_discount" DECIMAL(65,30) NOT NULL,
    "paid" DECIMAL(65,30),
    "unpaid" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_invoice_pkey" PRIMARY KEY ("invoice_no")
);

-- CreateTable
CREATE TABLE "public"."purchase_invoice_details" (
    "detail_invoice_no" SERIAL NOT NULL,
    "invoice_no" INTEGER NOT NULL,
    "item_no" INTEGER NOT NULL,
    "width" DECIMAL(65,30) NOT NULL,
    "height" DECIMAL(65,30) NOT NULL,
    "space" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "all_space" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_invoice_details_pkey" PRIMARY KEY ("detail_invoice_no")
);

-- AddForeignKey
ALTER TABLE "public"."purchase_invoice" ADD CONSTRAINT "purchase_invoice_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers_information"("supplier_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchase_invoice_details" ADD CONSTRAINT "purchase_invoice_details_invoice_no_fkey" FOREIGN KEY ("invoice_no") REFERENCES "public"."purchase_invoice"("invoice_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchase_invoice_details" ADD CONSTRAINT "purchase_invoice_details_item_no_fkey" FOREIGN KEY ("item_no") REFERENCES "public"."items_information"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
