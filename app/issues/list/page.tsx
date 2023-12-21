import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
// import delay from "delay";
import IssuesActions from "./IssuesActions";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { IssueQuery, columnsNames } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  // console.log(searchParams.orderBy);
  const orderBy = columnsNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: `${searchParams.sortOrder}` }
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

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
