import { Blockquote, Box, Transition } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

interface IQuote {
  author: string;
  quote: string;
}

const RandomQuote = () => {
  const [quote, setQuote] = useState<IQuote | null>();

  useEffect(() => {
    Axios.get(
      'https://api.quotable.io/random?tags=humor|humorous|pain|proverb|war|motivational|literature|history|famous-quotes'
    ).then((response) => {
      setTimeout(() => {
        setQuote({
          quote: response.data.content,
          author: response.data.author,
        });
      }, 2000);
    });
  }, []);

  return (
    <Transition
      duration={200}
      timingFunction='ease'
      mounted={!!quote}
      transition='fade'
    >
      {(styles) => (
        <Box style={styles}>
          <Blockquote cite={`- ${quote?.author}`}>{quote?.quote}</Blockquote>
        </Box>
      )}
    </Transition>
  );
};

export default RandomQuote;
