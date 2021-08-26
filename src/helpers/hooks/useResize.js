import { useState, useEffect } from 'react';

export default function(ref, callback, defaultValue = {}) {
  const [initialized, setInitialized] = useState(false)

  const getValue = () => {
    if (!ref && !ref.current) {
      return defaultValue;
    }

    return {
      height: ref.current.offsetHeight,
      width: ref.current.offsetWidth,
      x: ref.current.offsetLeft,
      y: ref.current.offsetTop,
      target: ref.current
    };
  }

  const onResize = () => {
    if ('function' === typeof callback) {
      callback(getValue());
    }
  }

  useEffect(() => {
    if (!initialized) {
      onResize()
      setInitialized(true)
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])
}
