import './Button.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';

interface IButtonProps {
  className?: string;
  type?: 'success' | 'danger';
  disabled?: boolean;
  onClick(): void;
}

const b = block('Button');

const Button: FunctionalComponent<IButtonProps> = (props) => {
  const { className, disabled, children, type = 'success', onClick } = props;

  return (
    <button
      className={b({ type, disabled }).mix(className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
