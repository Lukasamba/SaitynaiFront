import { useEffect, useState } from 'react';

interface DimensionsProps {
  width: undefined | number;
  height: undefined | number;
}

export const BOOTSTRAP_SM_CONTAINER_WIDTH = 576;
export const BOOTSTRAP_MD_CONTAINER_WIDTH = 768;
export const BOOTSTRAP_LG_CONTAINER_WIDTH = 992;
export const BOOTSTRAP_XL_CONTAINER_WIDTH = 1200;

export const smallerThanLg = (width: number | undefined): boolean => {
  if (!width) return true;
  return width < BOOTSTRAP_LG_CONTAINER_WIDTH;
};

const useWindowSize = (): DimensionsProps => {
  const [windowSize, setWindowSize] = useState<DimensionsProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
