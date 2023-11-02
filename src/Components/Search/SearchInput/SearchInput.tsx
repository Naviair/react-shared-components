import React, { RefObject } from 'react';
import { Icon, EIconTypes } from '../..';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
interface ISearchInput {
	/* Input JSX.Element to be rendered in wrapper */
	input: JSX.Element;
	/* Ref object */
	clickRef: RefObject<HTMLDivElement>;
	/* Search handler */
	onSearchIconClick?: () => void;
	className?: React.ReactNode;
	/* Whether to show the search input field on mobile */
	mobileShowSearch?: boolean;
	/* Mobile onIconClick (usually used to extend search bar from compact mode) */
	mobileOnIconClick?: () => void;
	children?: React.ReactNode;
}

/**
 * ## Mobile
 * @param props see {@link ISearchInput}
 * @returns Mobile search input component suitable for Mobile viewport
 */
const Mobile: React.FC<ISearchInput> = (props) => (
	<div key={'search_mobile'} className={`searchMobile${props.mobileShowSearch ? 'Extended' : ''} ${props.className}`} ref={props.clickRef}>
		<div key={'input_wrapper_mobile'} className={'inputWrapper'}>
			<div className={'iconWrapperMobile'}>
				<div className={'iconMobile'}>
					{props.mobileShowSearch ? (
						<Icon name={'times'} icon={faTimes} key={'search-icon-mobile-times'} type={EIconTypes.LIGHT} onClick={props.mobileOnIconClick} />
					) : (
						<Icon name={'search'} icon={faSearch} key={'search-icon-mobile-search'} type={EIconTypes.REGULAR} onClick={props.mobileOnIconClick} />
					)}
				</div>
			</div>
			{props.mobileShowSearch && (
				<div className={'iconWrapperMobile searchIconMobile'}>
					<div className={'iconMobile'}>
						<Icon name={'search'} icon={faSearch} key={'search-icon-mobile'} type={EIconTypes.REGULAR} onClick={props.onSearchIconClick} />
					</div>
				</div>
			)}
			{props.input}
		</div>
		{props.children}
	</div>
);

/**
 * ## Desktop
 * @param props see {@link ISearchInput}
 * @returns Desktop search input component suitable for Desktop viewport
 */
const Desktop: React.FC<ISearchInput> = (props) => {
	return (
		<div key={'search'} className={`search ${props.className}`} ref={props.clickRef}>
			<div key={'input_wrapper'} className={'inputWrapper'}>
				{props.input}
				<div className={'iconWrapper'}>
					<div className={'icon'}>
						<Icon name={'search'} icon={faSearch} key={'search-icon'} type={EIconTypes.REGULAR} onClick={props.onSearchIconClick} />
					</div>
				</div>
			</div>
			{props.children}
		</div>
	);
};

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Format components to SearchInput.<Component>
 */
export const SearchInput = {
	Desktop: Desktop,
	Mobile: Mobile,
};
/* eslint-enable @typescript-eslint/naming-convention */
