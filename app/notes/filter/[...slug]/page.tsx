import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NotesPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const currentTag = slug[0];

  const tag = currentTag === "all" ? "" : currentTag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, 10, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
