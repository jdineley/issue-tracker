"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  //   console.log("register:", register("title"));
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
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
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            //   console.log("error", error);
            setError("An unexpected error has occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
