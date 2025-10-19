import { NextResponse, NextRequest } from "next/server";
import getRouteParams from "@/lib/getRouteParams";
import { throwError, validateUser, getStatusName } from "@/lib/apiHandlers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { RecordWithAnyValue } from "@/interfaces/global";

export async function GET(request: NextRequest) {
  try {
    const { page_count, records_size, customer_name } = getRouteParams(request);

    let where: RecordWithAnyValue = {
      customer_name: {
        contains: customer_name,
      },
    };

    const parsedPage = Math.max(parseInt(String(page_count), 10) || 1, 1);
    const parsedPageSize = Math.min(
      Math.max(parseInt(String(records_size), 10) || 10, 1),
      100
    );
    const skip = (parsedPage - 1) * parsedPageSize;
    const take = parsedPageSize;

    const [total, responseData] = await Promise.all([
      prisma.customers_information.count({ where }),
      prisma.customers_information.findMany({
        where,
        skip,
        take,
        orderBy: { created_at: "desc" },
      }),
    ]);

    const computedData = responseData.map((record) => {
      const { created_at, updated_at } = record;
      return {
        ...record,
        updated_at: format(updated_at, "yyyy-MM-dd"),
        created_at: format(created_at, "yyyy-MM-dd"),
      };
    });
    const totalPages = Math.max(Math.ceil(total / parsedPageSize), 1);
    return validateUser({
      data: computedData,
      pagination: {
        page: parsedPage,
        pageSize: parsedPageSize,
        total,
        totalPages,
        hasNextPage: parsedPage < totalPages,
        hasPrevPage: parsedPage > 1,
      },
    });
  } catch (error) {
    throwError(error);
  }
}
