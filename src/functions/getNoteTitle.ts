interface Props {
  note: string;
}

export const getNoteTitle = ({ note }: Props): string => {
  const header = note
    .split('<h1>')
    .join(',')
    .split('</h1>')
    .join(',')
    .split(',')[1];

  if (!note || note === '' || header === '') return 'Empty Note';

  return header;
};
