import React, { RefObject, useRef, useState } from 'react';
import { SearchInput, SearchResult } from '.';
import { Select as AntdSelect, Tag } from 'antd';
import { useOutsideClick } from '../../Utils';
import './styles.scss';
import { BaseSelectRef } from 'rc-select';
import { Styles } from '../../Styles';

export interface ISuggests {
	/* Result key */
	key: string;
	/* Result title */
	title: string;
	/* Result description */
	description?: string;
	/* Result tags */
	tags?: string[];
}

export interface ISearch {
	/* Placeholder to be shown when input empty */
	placeholder?: string;
	/* onClick handler for every record retrieved as result */
	onRecordClick?: (key?: string) => void;
	/* Search handler function */
	onSearch?: (search?: string) => void;
	/*  Search submit handler */
	onSearchSubmit?: (inputText?: string[]) => void;
	/* Suggests result array */
	suggests?: ISuggests[];
	/* Mobile mode */
	mobile?: boolean;
	className?: string;
	/* Enable multiple search selections */
	multiple?: boolean;
	/* Allow user to enter a value that is not in the list of options */
	allowFreeText?: boolean;
}

/**
 * ## Search
 * @param props see {@link ISearch}
 * @returns a search component
 */
export const Search: React.FC<ISearch> = (props) => {
	const [getShowState, setShowState] = useState(false);
	const [getShowSearch, setShowSearch] = useState<boolean>(false);
	const [getInputState, setInputState] = useState<string[]>();
	const inputRef: RefObject<BaseSelectRef> = useRef(null);
	const inputRefSingle: RefObject<HTMLInputElement> = useRef(null);
	const searchResultRef: RefObject<HTMLDivElement> = useRef(null);
	const clickRef = useRef<HTMLDivElement>(null);

	/**
	 * ## useOutsideClick
	 * Listen for clicks outside input field
	 */
	useOutsideClick(clickRef, () => {
		if (!props.multiple) {
			setShowState(false);
		}
	});

	/**
	 * ## handleClick
	 * Handle click event, call @param props.onResultClick on corresponding element
	 * @param key the key string, representing element from search result
	 */
	const handleClick = (key: string) => {
		if (!props.multiple) {
			setShowState(false);
			setInputState([]);
		}
		setInputState(undefined);
		props.onRecordClick?.(key);
	};

	/**
	 * ## handleIconClick
	 * Icon click listener
	 * Called every time user clicks on icon
	 */
	const handleIconClick = () => {
		if (!props.multiple) {
			setInputState([]);
		}

		if (props.mobile) {
			setShowSearch(!getShowSearch);
			setShowState(!getShowState);
			setInputState(undefined);
		} else {
			props.onSearchSubmit?.(getInputState);
		}
	};

	/**
	 * Change focus to search results on certain keyboard events
	 * @param event
	 */
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (!props.multiple && (event.key === 'ArrowDown' || event.key === 'Enter')) {
			searchResultRef.current?.focus();
		}
	};

	/**
	 * ## handleOnFocus
	 * Action handler for input field focus
	 */
	const handleOnFocus = () => {
		if (!props.multiple) {
			inputRefSingle.current?.select();
			setShowState(true);
		}
	};

	/**
	 * ## handleSubmit
	 * Handle submit event, call @param props.onSearchSubmit with input value
	 */
	const handleSubmit = () => {
		props.onSearchSubmit?.(getInputState);
	};

	/**
	 * Input element for a "normal" or single search. Write some text and get suggestions
	 */
	const inputElementSingle: JSX.Element = (
		<input
			disabled={props.mobile ? (getShowSearch ? false : true) : undefined}
			key={props.mobile ? 'inputSearch' : 'input_search_mobile'}
			ref={inputRefSingle}
			value={getInputState}
			onFocus={handleOnFocus}
			className={'input'}
			placeholder={props.placeholder}
			onKeyDown={handleKeyDown}
			onChange={(e) => {
				const { value } = e.target;
				setInputState([value]);
				props.onSearch?.(value);
			}}
		/>
	);

	/**
	 * Input element for a multiple search. Write some text and depending on props, choose from or get help from suggestions
	 */
	const inputElementMultiple: JSX.Element = (
		<AntdSelect<string[]>
			disabled={props.mobile ? (getShowSearch ? false : true) : undefined}
			key={props.mobile ? 'inputSearch' : 'input_search_mobile'}
			ref={inputRef}
			mode={props.multiple ? (props.allowFreeText ? 'tags' : 'multiple') : undefined} // Select multiple tags or only one. 'tags' means possibility to write whatever, 'multiple' means only selecting from suggestions
			bordered={false} // Remove styling from input
			maxTagCount={2} // Maximum number of tags shown before a +<x> is shown
			defaultActiveFirstOption={true} // Toggle auto focus to first element in suggestions
			showArrow={false}
			showSearch={props.allowFreeText} // Allow for free text or only allow the suggestions
			onSearch={props.onSearch}
			onFocus={handleOnFocus}
			notFoundContent={null}
			className={'input'}
			placeholder={props.placeholder}
			onKeyDown={handleKeyDown}
			onChange={(value) => setInputState(value)}>
			{((props.mobile && getShowState) || !props.mobile) &&
				props.suggests &&
				props.suggests.length > 0 &&
				props.suggests.map((suggest, index) => {
					return (
						<AntdSelect.Option key={suggest.key} title={suggest.title} value={suggest.key} onClick={handleClick}>
							<div className={'searchMenuItemContainer'} tabIndex={index}>
								<div className={'title'}>{suggest.title}</div>
								{suggest.description && <div className={'description'}>{suggest.description}</div>}
								{suggest.tags && (
									<div className={'tag'}>
										{suggest.tags.map((tag, tagIndex) => (
											<Tag key={`tagKey_${index}_${tagIndex}`} color={Styles.BrandColor}>
												{tag}
											</Tag>
										))}
									</div>
								)}
							</div>
						</AntdSelect.Option>
					);
				})}
		</AntdSelect>
	);

	return props.mobile ? (
		<SearchInput.Mobile
			className={props.className}
			clickRef={clickRef}
			input={props.multiple ? inputElementMultiple : inputElementSingle}
			mobileShowSearch={getShowSearch}
			mobileOnIconClick={handleIconClick}
			onSearchIconClick={handleSubmit}>
			{!props.multiple && (
				<SearchResult
					ref={searchResultRef}
					key={'search_result_mobile'}
					suggests={props.suggests}
					getShowState={getShowState}
					onClick={handleClick}
					mobile={props.mobile}
				/>
			)}
		</SearchInput.Mobile>
	) : (
		<SearchInput.Desktop
			className={props.className}
			clickRef={clickRef}
			input={props.multiple ? inputElementMultiple : inputElementSingle}
			onSearchIconClick={handleSubmit}>
			{!props.multiple && (
				<SearchResult
					ref={searchResultRef}
					key={'search_result'}
					suggests={props.suggests}
					getShowState={getShowState}
					onClick={handleClick}
					mobile={props.mobile}
				/>
			)}
		</SearchInput.Desktop>
	);
};
