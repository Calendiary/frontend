'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  year: number;
  month: number; // 0~11
  className?: string;
}

const MonthLabel: React.FC<Props> = ({ year, month, className = '' }) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const date = new Date(year, month);
    const formatted = date.toLocaleString('default', {
      month: 'long',
    });
    setLabel(`${year} ${formatted}`);
  }, [year, month]);

  return (
    <h2 className={`text-lg font-bold tracking-wide ${className}`}>
      {label}
    </h2>
  );
};

export default MonthLabel;
