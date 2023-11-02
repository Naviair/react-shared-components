import { IControl } from 'mapbox-gl';
import { IMapboxControlOptions, MapboxControl } from '../Controls';

export interface IMapControlButton {
	handlers: IControl;
	position: TMapControlPosition;
}

type TMapControlPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/* Create map button. Can be parsed to useMap hook to create map button fast. */
export const createMapButton = (options: IMapboxControlOptions, position: TMapControlPosition): IMapControlButton => {
	const mapboxControl = MapboxControl({
		...options,
	});

	const handleOnAdd = (map: mapboxgl.Map): HTMLElement => {
		return mapboxControl.onAdd(map);
	};

	const handleOnRemove = (map: mapboxgl.Map) => {
		return mapboxControl.onRemove(map);
	};

	return {
		handlers: {
			onAdd: handleOnAdd,
			onRemove: handleOnRemove,
		},
		position: position,
	};
};
