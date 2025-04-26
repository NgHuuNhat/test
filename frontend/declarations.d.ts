declare module 'lodash.debounce' {
    const debounce: <T extends (...args: any[]) => any>(
      func: T,
      wait?: number
    ) => T;
    export default debounce;
  }
  