import { keyframes } from 'styled-components';

const zoomIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const animatedText = keyframes`
  from {
    opacity: 0;
    transform: perspective(500px) translate3d(-35px, -40px, -150px) rotate3d(1, 0, 0, 45deg);
  }

  to {
    opacity: 1;
    transform: perspective(500px) translate3d(0, 0, 0);
  }
`;

const scaleLeft = keyframes`
  from {
    opacity: 0;
    transform: scaleX(0.4);
    transform-origin: 0% 0%;
  }

  to {
    opacity: 1;
    transform: scaleX(1);
    transform-origin: 0% 0%;
  }
`;

export {
  animatedText,
  zoomIn,
  scaleLeft,
};
