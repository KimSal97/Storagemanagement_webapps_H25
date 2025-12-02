export const env = {
  DB: {
    prepare() {
      throw new Error("Prøvde å bruke database i testmiljø");
    },
  } as any,
};