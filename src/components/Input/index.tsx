import React from 'react';
import classNames from 'classnames';

import Styles from './Input.module.less';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  const { onPressEnter, onBlur, onChange, className } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onPressEnter && e.key === 'Enter') {
      onPressEnter(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
  };

  return (
    <input
      {...props}
      className={classNames(Styles.input, className)}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
