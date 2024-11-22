import { FC, ReactNode } from 'react';
import SpinnerUi from '../../ui/SpinnerUI/Spinner';

interface LoaderProps {
  showSpinner: boolean;
  children: ReactNode;
}

const Loader: FC<LoaderProps> = ({ showSpinner, children }) => {
  if (showSpinner) return <SpinnerUi />;
  return <>{children}</>;
};

export default Loader;
