import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { item_id, item_name, active, record_status } = await request.json();

    if (record_status === "n") {
      await prisma.items_information.create({
        data: {
          item_id,
          item_name,
          active,
        },
      });
    } else if (record_status === "u") {
      await prisma.items_information.update({
        where: {
          item_id,
        },
        data: {
          item_id,
          item_name,
          active,
        },
      });
    } else if (record_status === "d") {
      await prisma.items_information.delete({
        where: {
          item_id,
        },
      });
    }

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
