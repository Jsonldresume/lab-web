import React, { memo, useContext } from 'react';
import AppContext from '../../../context/AppContext';

const HeadingB = ({ children }) => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <h6
      className="mb-2 border-b-2 pb-1 font-bold uppercase tracking-wide text-sm"
      style={{
        color: theme.colors.primary,
        borderColor: theme.colors.primary,
      }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingB);
