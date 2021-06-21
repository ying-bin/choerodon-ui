import React, { FunctionComponent } from 'react';
import { ElementProps } from '../core/ViewComponent';

export interface PopupInnerProps extends ElementProps {
  innerRef: (node) => void;
}

const PopupInner: FunctionComponent<PopupInnerProps> = ({ innerRef, ...props }) => (
  <div {...props} ref={innerRef} />
);

export default PopupInner;
