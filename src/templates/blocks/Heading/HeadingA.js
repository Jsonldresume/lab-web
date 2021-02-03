import React, { memo, useContext } from 'react';
import AppContext from '../../../context/AppContext';

const HeadingA = ({ children }) => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  return (
    <h6
      className="text-xs font-bold uppercase mb-1"
      style={{ color: theme.colors.primary }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingA);
