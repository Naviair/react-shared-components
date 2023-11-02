import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Drawer } from '..';
import { IconName } from '../../';
import 'mapbox-gl/dist/mapbox-gl.css';
import { addControls, IMapControlButton } from './utils';
import mapboxgl from 'mapbox-gl';

export type TSidePanel = {
	id: string;
	icon: IconName;
	tooltip?: string;
	component: JSX.Element;
	className?: string;
};

type TMapOptions = Omit<mapboxgl.MapboxOptions, 'container'>;

export interface IMapOptions extends TMapOptions {
	mapStyle?: EMapType;
	autoResize?: boolean;
	sidePanels?: TSidePanel[];
	buttons?: IMapControlButton[];
}

export enum EMapType {
	LIGHT = 'mapbox://styles/mapbox/light-v10',
	DARK = 'mapbox://styles/mapbox/dark-v10',
	SATELLITE = 'mapbox://styles/mapbox/satellite-v9',
	SATELLITE_STREETS = 'mapbox://styles/mapbox/satellite-streets-v11',
	STREETS = 'mapbox://styles/mapbox/streets-v11',
	OUTDOORS = 'mapbox://styles/mapbox/outdoors-v11',
	NAVIGATION_DAY = 'mapbox://styles/mapbox/navigation-day-v1',
	NAVIGATION_NIGHT = 'mapbox://styles/mapbox/navigation-night-v1',
}

export interface IuseMap {
	renderMap: JSX.Element;
	mapObj?: mapboxgl.Map;
}

/**
 * ## useMap
 * Initialize a new map component easily.
 **/
export const useMap = (accessToken: string, options: IMapOptions): IuseMap => {
	/* MapboxGL access token */
	mapboxgl.accessToken = accessToken;
	const mapContainer = useRef<HTMLDivElement>(null);
	const [getActiveDrawerState, setActiveDrawerState] = useState<number | undefined>();
	const [mapObj, setMapObj] = useState<mapboxgl.Map>();

	/* Map initializer */
	const loadMap = () => {
		if (mapContainer.current) {
			const map = new mapboxgl.Map({
				...options,
				container: mapContainer.current,
				style: options.mapStyle,
				attributionControl: false,
			});
			map.once('load', () => handleLoad(map));
			setMapObj(map);
		}
	};

	/* Add resources to map. */
	const handleLoad = (map: mapboxgl.Map) => {
		options.sidePanels && addControls(map, options.sidePanels);
		options.buttons?.map((button) => {
			map.addControl(button.handlers, button.position);
		});
		//Handles set of activeDrawer
		map.on('showSidePanel', (evt) => setActiveDrawerState(evt.index));
	};

	/* Map mount */
	useEffect(() => {
		loadMap();

		/* resize handler */
		if (options.autoResize)
			window.addEventListener('resize', () =>
				setTimeout(() => {
					mapObj?.resize();
				}, 100)
			);
	}, []);

	const renderMap = (
		<div className={'scMap'}>
			<Drawer width={300} renderInDom mask={false} open={getActiveDrawerState !== undefined ? true : false} closable={false}>
				{getActiveDrawerState !== undefined && options.sidePanels?.[getActiveDrawerState].component}
			</Drawer>
			<div className={'scMapContainer'} ref={mapContainer}></div>
		</div>
	);

	return {
		renderMap,
		mapObj,
	};
};
