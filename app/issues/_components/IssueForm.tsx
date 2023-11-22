"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

// Lazy loading
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  //   console.log("register:", register("title"));
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      //   const response = await fetch("http://localhost:3000/api/issues", {
      //     method: "POST",
      //     body: JSON.stringify(data),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   console.log("response", response.status);
      //   const body = await response.json();
      //   console.log("body:", body);
      //   if (!response.ok) throw body;
      //   router.push("/issues");
      // with axios:
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      //   console.log("error", error);
      setSubmitting(false);
      setError("An unexpected error has occured");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title")}
            defaultValue={issue?.title}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
