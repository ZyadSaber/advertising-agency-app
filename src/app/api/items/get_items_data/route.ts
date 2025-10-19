import { NextResponse, NextRequest } from "next/server";
import getRouteParams from "@/lib/getRouteParams";
import { throwError, validateUser, getStatusName } from "@/lib/apiHandlers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { RecordWithAnyValue } from "@/interfaces/global";

export async function GET(request: NextRequest) {
  try {
    const { page_count, records_size, item_name } = getRouteParams(request);

    let where: RecordWithAnyValue = {
      item_name: {
        contains: item_name,
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
      prisma.items_information.count({ where }),
      prisma.items_information.findMany({
        where,
        skip,
        take,
        orderBy: { item_id: "desc" },
      }),
    ]);

    const totalPages = Math.max(Math.ceil(total / parsedPageSize), 1);
    return validateUser({
      data: responseData,
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
