import { IControl } from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from 'antd';
import './styles.scss';
import { Icon, EIconTypes, IconName } from '../../..';
import { ConditionalWrapper } from '../../../ConditionalWrapper';

export interface ICallbackControlOptions {
	/* onClick handler */
	onClick: (isActive?: boolean) => void;
	/* Set the button as active */
	setActive?: boolean;
	/* Icon to be rendered in center */
	icon?: IconName;
	/* Icon to be rendered when active */
	activeIcon?: IconName;
	/* Unique button ID */
	id: string;
	/* The button group id, the button belongs to */
	buttonGroup: string;
	/* ClassName */
	className?: string;
	/* Tooltip on hover */
	tooltip?: string;
}

/* Button constructor */
export const CallbackControl = (options: ICallbackControlOptions): IControl => {
	return MapboxControl({
		icon: options.icon ? options.icon : 'layer-group', //fallback
		setActive: true,
		...options,
	});
};

/**
 * Props for {@link MapboxControl}
 */
export interface IMapboxControlOptions extends ICallbackControlOptions {
	/* Button title */
	title?: string;
	/* Icon in raw SVG format */
	rawIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	/* Dictates rotation behaviour */
	rotateIcon?: boolean;
}

interface IMapboxButton extends IMapboxControlOptions {
	map: mapboxgl.Map;
}

const MapboxButton: React.FC<IMapboxButton> = (props) => {
	const [activeState, setActiveState] = useState(false);
	const [rotateState, setRotateState] = useState(0);
	const [showSidePanelState, setSidePanelState] = useState(false);

	useEffect(() => {
		props.map.on('rotate', () => onRotate());
		props.map.on('showSidePanel', (evt) => setSidePanelState(evt.show));
		props.map.on('buttonGroupChange', (evt) => {
			if (props.buttonGroup === evt.group && props.id !== evt.key) {
				setActiveState(false);
			}
		});
	}, []);

	const onClick = () => {
		if (props.rotateIcon) {
			props.map.easeTo({ bearing: 0 });
			setRotateState(0);
		}
		props.setActive && setActiveState(!activeState);
		props.onClick(!activeState);
		props.buttonGroup && props.map.fire('buttonGroupChange', { group: props.buttonGroup, key: props.id });
	};

	const onRotate = () => {
		if (props.rotateIcon) {
			const angle = props.map.getBearing() * -1;
			setRotateState(angle);
		}
	};
	let iconButton;
	if (activeState && props.activeIcon) {
		iconButton = <Icon name={props.activeIcon} type={EIconTypes.LIGHT} />;
	} else if (props.icon) {
		iconButton = <Icon name={props.icon} type={EIconTypes.LIGHT} />;
	} else if (props.rawIcon) {
		iconButton = <props.rawIcon />;
	}

	return (
		<React.Suspense fallback={<div />}>
			<div
				style={{ transform: `rotate(${rotateState}deg)` }}
				className={`mapboxgl-ctrl mapboxgl-ctrl-group ${props.title && 'text'} ${showSidePanelState ? 'sidepanel-visible' : ''}`}>
				<ConditionalWrapper condition={!!props.tooltip} wrapper={(children: React.ReactElement) => <Tooltip title={props.tooltip}>{children}</Tooltip>}>
					<button
						key={`keyTrigger${activeState}`}
						className={`buttonMap ${activeState && '-active'} ${props.title && '-withTitle'} ${props.className && props.className}`}
						onClick={onClick}>
						<div className={props.title ? 'button-divText' : 'button-div'}>
							<span className={'button-icon'}>{iconButton}</span>
							<span className={'button-title'}>{props.title && props.title}</span>
						</div>
					</button>
				</ConditionalWrapper>
			</div>
		</React.Suspense>
	);
};

/* MapboxControl handler */
export const MapboxControl = (options: IMapboxControlOptions): IControl => {
	let controlContainer: HTMLElement;

	const insertControls = (map: mapboxgl.Map) => {
		controlContainer = document.createElement('div');
		ReactDOM.render(<MapboxButton map={map} {...options} onClick={options.onClick} />, controlContainer);
	};

	const onAdd = (map: mapboxgl.Map): HTMLElement => {
		insertControls(map);
		return controlContainer;
	};

	const onRemove = (): void => {
		controlContainer.parentNode?.removeChild(controlContainer);
	};

	return {
		onAdd: (map: mapboxgl.Map) => onAdd(map),
		onRemove: () => onRemove(),
	};
};
