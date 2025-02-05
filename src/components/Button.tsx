import React from 'react';

function Button(props?: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props ?? {};
  return (
    <button
      className={
        'text-sm bg-amber-200 rounded-md hover:cursor-pointer hover:bg-amber-300 active:bg-amber-400 px-2 py-1'
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
