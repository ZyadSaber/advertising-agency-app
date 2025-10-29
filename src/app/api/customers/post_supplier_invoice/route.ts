import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      invoice_date,
      invoice_notes,
      supplier_id,
      total_invoice,
      discount,
      total_after_discount,
      paid,
      unpaid,
      invoiceDetails,
      bank,
    } = await request.json();

    const { invoice_no } = await prisma.purchase_invoice.create({
      data: {
        invoice_date: new Date(invoice_date),
        invoice_notes,
        supplier_id,
        total_invoice,
        discount,
        total_after_discount,
        paid,
        unpaid,
        bank,
      },
    });

    const computedInvoiceDetails = invoiceDetails.map(
      ({
        item_no,
        width,
        height,
        space,
        quantity,
        all_space,
        price,
        total_price,
        notes,
      }) => ({
        invoice_no,
        item_no,
        width,
        height,
        space,
        quantity,
        all_space,
        price,
        total_price,
        notes,
      })
    );

    await prisma.purchase_invoice_details.createMany({
      data: computedInvoiceDetails,
    });

    return NextResponse.json(
      {
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
