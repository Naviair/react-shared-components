import mapboxgl from 'mapbox-gl';
import { TSidePanel } from '../..';
import { CallbackControl } from '../Controls';

/* Add controls to map iterator */
export const addControls = (map: mapboxgl.Map, sidepanels: TSidePanel[]): void => {
	sidepanels.forEach((sidepanel, index) => {
		map.addControl(
			CallbackControl({
				...sidepanel,
				buttonGroup: 'sidePanel',
				onClick: (isActive) => map.fire('showSidePanel', { index: isActive ? index : undefined, show: isActive }),
				activeIcon: 'arrow-to-right',
			})
		);
	});
};
