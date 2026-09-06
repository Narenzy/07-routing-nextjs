"use client";

import css from "./Notes.module.css";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { useDebounce } from "@/hooks/useDebounce";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, 10, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
