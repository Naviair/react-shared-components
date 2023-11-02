import React from 'react';
import { Icon, EIconTypes } from '../../';
import { EScreenType } from '@naviair/node-shared-interfaces';
import { faTools } from '@fortawesome/pro-solid-svg-icons/faTools';
import './styles.scss';

/**
 * Props for the Maintenance component
 */
export interface IMaintenance {
	/* Main title to display. Required.*/
	title: string;
	/** Which style to render, dependant on {@link EScreenType } **/
	screenState: EScreenType;
	/* Any extra text to display below the title. Part into array for multiple sections. Optional. */
	subtitle?: string | string[];
	children?: React.ReactNode;
}

/**
 * ## Maintenance page implementation
 *
 * @example <Maintenance
 * title={"Maintenance underway"}
 * subtitle={["Planned maintenance 16-03-2021", "Last update 10:55am"]} />
 *
 * @returns The maintenance page
 */
export const MaintenanceView: React.FC<IMaintenance> = (props) => {
	/**
	 * If not already set, sets props.subtitles to an array and maps it to <p> elements.
	 *
	 * @param subtitles Subtitles to include below the tools icon.
	 * @returns the mapped subtitles as <p> elements
	 */
	const handleSubtitles = (subtitles: string | string[]) => {
		if (!Array.isArray(subtitles)) subtitles = [subtitles];
		return subtitles.map((text, index) => (
			<p key={`${'subtitle'}-${index}`} className={'subtitle'}>
				{text}
			</p>
		));
	};

	return (
		<div className={'maintenance'}>
			<div className={`maintenanceContent${props.screenState === EScreenType.MOBILE ? '_mobile' : ''}`}>
				<h1>{props.title}</h1>
				<div className={'iconWrapper'}>
					<Icon name={'tools'} icon={faTools} className={'icon'} type={EIconTypes.SOLID} />
				</div>
				{props.subtitle && handleSubtitles(props.subtitle)}
				{props.children}
			</div>
		</div>
	);
};
