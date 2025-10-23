import { NextResponse, NextRequest } from "next/server";
import getRouteParams from "@/lib/getRouteParams";
import { throwError, validateUser, getStatusName } from "@/lib/apiHandlers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { RecordWithAnyValue } from "@/interfaces/global";
import generateListData from "@/lib/generateListData";

export async function GET(request: NextRequest) {
  try {
    const customersData = await prisma.customers_information.findMany({
      orderBy: { created_at: "desc" },
    });

    return validateUser(
      generateListData(customersData, {
        key: "customer_id",
        value: "customer_name",
      })
    );
  } catch (error) {
    throwError(error);
  }
}
