"use client";

import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  if (isError) {
    return <p>Something went wrong.</p>;
  }
  if (!data) {
    return <p>Note not found</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </main>
  );
}
