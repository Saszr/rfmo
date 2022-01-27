import renderImperativeDialog from './ImperativeDialog';
import type { ImperativeDialogProps } from './ImperativeDialog';

interface DialogStaticFunctions {
  render: (config: ImperativeDialogProps) => void;
}

const Dialog = {} as DialogStaticFunctions;

Dialog.render = (config: ImperativeDialogProps) => {
  renderImperativeDialog(config);
};

export default Dialog;
