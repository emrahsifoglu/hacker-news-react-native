import Localization from '../localization';

export const toLocaleDateString = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-GB');
};

export const toLocaleTimeString = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString(Localization.CZ);
};
