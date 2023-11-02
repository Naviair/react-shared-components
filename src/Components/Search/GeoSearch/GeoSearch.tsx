import React, { useState } from 'react';
import mbxGeocoder, { GeocodeFeature, GeocodeRequest, GeocodeResponse } from '@mapbox/mapbox-sdk/services/geocoding';
import { Search, ISuggests } from '..';
import { SdkConfig } from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mbxClient = require('@mapbox/mapbox-sdk');

/**
 * ## geoCodingLookup
 * Lookup geo locations with Mapbox API.
 * @param searchInput The input value to be processed
 * @param countries The country search result boundary
 * @param limit The number of results to return
 */
export const geoLookup = (baseClient: SdkConfig, searchInput: string, countries: string[], searchLanguage?: string, limit = 5): Promise<GeocodeFeature[]> => {
	const geocoderService = mbxGeocoder(baseClient);
	return new Promise((resolve, reject) => {
		try {
			const request: GeocodeRequest = {
				query: searchInput,
				mode: 'mapbox.places',
				countries: countries,
				language: [searchLanguage ? searchLanguage : 'en-GB'],
				limit,
			};
			geocoderService
				.forwardGeocode(request)
				.send()
				.then((response) => {
					const match: GeocodeResponse = response.body;
					const features: GeocodeFeature[] = match.features;
					resolve(features);
				});
		} catch (error) {
			reject(error);
		}
	});
};

export interface IGeoSearch {
	/* MapBox access token */
	accessToken: string;
	/* The search language to be used */
	searchLanguage?: string;
	/* Country lookup boundary. Multiple can be specified. */
	/* !You can find a list of ISO country codes [here](https://www.ncbi.nlm.nih.gov/books/NBK7249/)*/
	searchCountries?: string[];
	/* Number of results to display */
	searchLimit?: number;
	/* The input placerholder */
	searchPlaceholder?: string;
	/* Set mobile state. (Compact) */
	mobile?: boolean;
	/* ClassName to be parsed to Search component */
	className?: string;
	/* Handler to customize tag render */
	tagRender?: (tag: string) => string;
	/* On input change handler */
	handleChange?: (input?: string) => void;
	/* Result  click handler */
	handleResultClick?: (key?: string) => void;
}

/**
 * ## GeoSearch
 * Modified {@link Search} component
 * @example <GeoSearch
				accessToken={'someApiString'}
				searchPlaceholder={'Find greenland address'}
				key={'geosearch-key'}
				searchCountries={['gl']}
			/>
 * @returns geoLookup() results.
 */
export const GeoSearch: React.FC<IGeoSearch> = (props) => {
	const [getGeoResultState, setGeoResultState] = useState<ISuggests[]>();
	const baseClient = new mbxClient({ accessToken: props.accessToken });

	/**
	 * ## handleResultClick
	 * Result click action handler
	 * Clear results on click
	 * @param key The clicked key
	 */
	const handleResultClick = (key?: string) => {
		props.handleResultClick?.(key);
		setGeoResultState(undefined);
	};

	/**
	 * ## handleOnChange
	 * Called everytime input value changes in searchbar
	 * @param input Current input value to be processed
	 */
	const handleOnChange = (input?: string) => {
		/* If handleChange prop defined, use. Else use default handlechange */
		if (props.handleChange) {
			props.handleChange(input);
		} else {
			if (input && input.length > 0) {
				geoLookup(baseClient, input, props.searchCountries ? props.searchCountries : [], props.searchLanguage, props.searchLimit).then((features) => {
					parseResult(features);
				});
			} else {
				setGeoResultState([]);
			}
		}
	};

	/**
	 * ## parseResult
	 * Parse the resulting features from {@link GeocodeFeature}[] to {@link ISuggests}[]
	 * Pass the result to <Search>
	 * @param results The lookup results.
	 */
	const parseResult = async (results: GeocodeFeature[]) => {
		const parsedResults: ISuggests[] = results.map((item) => {
			const tags: string[] = item.place_type.map((tag: string) => {
				return props.tagRender?.(tag) ?? tag;
			});
			return { key: item.id, title: item.text, description: item.place_name, tags: tags };
		});
		setGeoResultState(parsedResults);
	};

	return (
		<>
			<Search
				className={props.className}
				key={'search-input'}
				placeholder={props.searchPlaceholder}
				suggests={getGeoResultState}
				onRecordClick={handleResultClick}
				mobile={props.mobile}
				onSearch={handleOnChange}
			/>
		</>
	);
};
