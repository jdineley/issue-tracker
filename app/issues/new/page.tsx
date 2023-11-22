import React from "react";
// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";
import delay from "delay";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssueForm = async () => {
  return <IssueForm />;
};

export default NewIssueForm;
