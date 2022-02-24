import React from 'react';
import classNames from 'classnames';

import omit from '@/utils/omit';

import Styles from './Input.module.less';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  const { onPressEnter, onBlur, onChange, className } = props;
  const otherProps = omit(props as InputProps & { inputType: any }, ['onPressEnter']);

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
      {...otherProps}
      className={classNames(Styles.input, className)}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;
