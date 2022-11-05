import { keyframes } from '@emotion/react';

export const fadeFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const fadeFromRight = keyframes`
from {
  opacity: 0;
  transform: translateX(50px);
}

to {
  opacity: 1;
  transform: translateX(0px);
}
`;

export const fadeFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;
