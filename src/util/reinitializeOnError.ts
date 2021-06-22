export const reinitializeOnError = async (initializeFunction: Function) => {
    setTimeout(() => {
      initializeFunction();
    }, 30000);
  };
  