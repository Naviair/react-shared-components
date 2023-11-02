import React, { ReactElement } from 'react';

export interface IConditionalWrapper {
	/* The condition to be the wrapper trigger decider */
	condition: boolean;
	/* The wrapper function and behaviour in relation to children */
	wrapper: (children: ReactElement) => ReactElement;
	/* The children to be conditionally wrapped */
	children: React.ReactElement;
}

/**
 * ## ConditionalWrapper
 * Wrap Children in some Element, based on some condition. Saves a lot of duplicate code in some rendering cases. Read: https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
 * 
 * For example instead of:
		@example
		* 			props.tooltip ? (
		* 				<Tooltip title={props.tooltip}>
							<button key={`keyTrigger${activeState}`} className={`${activeState ? '-active' : ''} ${props.className ? props.className : ''}`} onClick={onClick}>
								{iconButton}
							</button>
						</Tooltip>
						:
						<button key={`keyTrigger${activeState}`} className={`${activeState ? '-active' : ''} ${props.className ? props.className : ''}`} onClick={onClick}>
							{iconButton}
						</button>
						)
		One can just choose to use the ConditionalWrapper, and write:
		@example
						<ConditionalWrapper condition={!!props.tooltip} wrapper={(children: React.ReactElement) => <Tooltip title={props.tooltip}>{children}</Tooltip>}>
							<button key={`keyTrigger${activeState}`} className={`${activeState ? '-active' : ''} ${props.className ? props.className : ''}`} onClick={onClick}>
								{iconButton}
							</button>
						</ConditionalWrapper>
 */
export const ConditionalWrapper: React.FC<IConditionalWrapper> = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);
