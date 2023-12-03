import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
// import delay from "delay";
import { IssueStatusBadge, Link } from "@/app/components/index";
import IssuesActions from "./IssuesActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnsNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnsNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({ where });

  // await delay(2000);

  return (
    <Flex direction="column" gap="3">
      <IssuesActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={totalIssues}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
