export const useCommon = () => {

  const dateToString = (time: Date) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hout = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hout}:${minute}:${second}`;
    return formattedDate;
  };

  const timeStampToString = (timestamp: string | null | undefined): string | undefined => {
    if (!timestamp) return;
    const { locale } = useI18n();

    return new Date(timestamp).toLocaleString(locale.value, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-')
  };

  const debounce = <T extends (...args: unknown[]) => void>(
    fn: T, 
    delay: number = 1000
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay)
    };
  };

  const throttle = <T extends (...args: unknown[]) => void>(
    fn: T, 
    delay = 1000
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;

    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay){
        fn(...args);
        lastCall = now;
      }
    };
  };


  return {
    dateToString,
    timeStampToString,
    debounce,
    throttle
  }
}
