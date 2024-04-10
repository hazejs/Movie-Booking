import * as animationData from '../lottieLogin.json';

export const tabStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  paddingBottom: 0,
  fontFamily: 'cursive',
};

export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const mB50 = {
  marginBottom: 50,
  fontSize: 20,
};

export const mB20 = {
  marginBottom: 20,
  fontSize: 20,
};

export const tagBackground = {
  background:
    'linear-gradient(90deg, hsla(239, 100%, 67%, 1) 0%, hsla(187, 100%, 89%, 1) 100%)',
};

export const actionsWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const fontS18 = {
  fontSize: 18,
};

export const fontS16 = {
  fontSize: 16,
};

export const showtimesContainer = {
  display: 'flex',
  flexDirection: 'column',
};

export const selectContainer = {
  position: 'absolute',
  width: 200,
  top: 50,
  right: 50,
};
