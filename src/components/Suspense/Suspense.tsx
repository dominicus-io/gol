import { FC, ReactElement } from "react";

export type SuspenseProps = {
  fallback: ReactElement;
  loading?: boolean;
};

const Suspense: FC<SuspenseProps> = ({ fallback, loading, children }) => {
  return (
    <>
      {loading && fallback}
      {children}
    </>
  );
};

export default Suspense;
