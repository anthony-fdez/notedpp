import { NavLink } from "@mantine/core";
import React from "react";
import { INote } from "../../../../../interfaces/INote";

interface Props {
  note: INote;
}

const NoteItem = ({ note }: Props) => {
  return (
    <div key={note.id}>
      <NavLink label={note.note} />
    </div>
  );
};

export default NoteItem;
