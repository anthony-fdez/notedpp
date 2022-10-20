interface Props {
  note: string;
}

export const getNoteTitle = ({ note }: Props): string => {
  console.log(note);
  const header = note
    .split('<h1>')
    .join(',')
    .split('</h1>')
    .join(',')
    .split(',')[1];

  console.log(header);

  return header;
};
