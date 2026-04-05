import { useEffect } from 'react';

export const useBodyScrollLock = () => {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflowY = document.documentElement.style.overflowY;
    const previousHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.documentElement.style.overflowY = 'scroll';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      const savedScrollY = Math.abs(parseInt(document.body.style.top || '0', 10));

      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.documentElement.style.overflowY = previousHtmlOverflowY;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      window.scrollTo(0, savedScrollY);
    };
  }, []);
};
