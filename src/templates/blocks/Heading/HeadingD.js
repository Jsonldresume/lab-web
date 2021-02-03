import React, { memo, useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { hexToRgb } from '../../../utils';

const HeadingD = ({ children }) => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;
  const { r, g, b } = hexToRgb(theme.colors.primary) || {};

  return (
    <h6
      className="py-1 px-4 rounded-r leading-loose font-bold text-xs uppercase tracking-wide mb-3"
      style={{
        marginLeft: '-15px',
        color: theme.colors.background,
        backgroundColor: `rgba(${r - 40}, ${g - 40}, ${b - 40}, 0.8)`,
      }}
    >
      {children}
    </h6>
  );
};

export default memo(HeadingD);
