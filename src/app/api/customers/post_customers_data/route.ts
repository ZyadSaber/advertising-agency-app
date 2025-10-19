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
      customer_id,
      customer_name,
      customer_address,
      customer_phone,
      active,
      record_status,
    } = await request.json();

    let newRecord: { customer_id?: number; customer_name?: string } = {};

    if (record_status === "n") {
      newRecord = await prisma.customers_information.create({
        data: {
          customer_id,
          customer_name,
          customer_address,
          customer_phone,
          active,
        },
      });
    } else if (record_status === "u") {
      newRecord = await prisma.customers_information.update({
        where: {
          customer_id,
        },
        data: {
          customer_id,
          customer_name,
          customer_address,
          customer_phone,
          active,
        },
      });
    } else if (record_status === "d") {
      await prisma.customers_information.delete({
        where: {
          customer_id,
        },
      });
    }

    return NextResponse.json(
      {
        status: "success",
        id: newRecord?.customer_id,
        name: newRecord?.customer_name,
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
