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
      supplier_id,
      supplier_name,
      supplier_address,
      supplier_phone,
      active,
      record_status,
    } = await request.json();

    let newRecord: { supplier_id?: number; supplier_name?: string } = {};

    if (record_status === "n") {
      newRecord = await prisma.suppliers_information.create({
        data: {
          supplier_id,
          supplier_name,
          supplier_address,
          supplier_phone,
          active,
        },
      });
    } else if (record_status === "u") {
      newRecord = await prisma.suppliers_information.update({
        where: {
          supplier_id,
        },
        data: {
          supplier_id,
          supplier_name,
          supplier_address,
          supplier_phone,
          active,
        },
      });
    } else if (record_status === "d") {
      await prisma.suppliers_information.delete({
        where: {
          supplier_id,
        },
      });
    }

    return NextResponse.json(
      {
        status: "success",
        id: newRecord?.supplier_id,
        name: newRecord?.supplier_name,
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
