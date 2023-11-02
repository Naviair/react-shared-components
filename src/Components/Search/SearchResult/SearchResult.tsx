import React, { Ref } from 'react';
import { ISuggests } from '../Search';
import { Styles } from '../../../Styles/Styles';
import './styles.scss';
import { Menu, Tag } from 'antd';

interface ISearchItem {
	/* The array of suggested search results */
	suggests?: ISuggests[];
	/* Show results */
	getShowState: boolean;
	/* Set mobile */
	mobile?: boolean;
	/* React ref for first element of the result list */
	ref?: Ref<HTMLDivElement>;
	/* Item click handler */
	onClick: (key: string) => void;
}

/**
 * ## SearchResult
 * @param props see {@link ISearchItem}
 * @returns A result component with suggested search results
 */
export const SearchResult: React.FC<ISearchItem> = React.forwardRef<HTMLDivElement, ISearchItem>((props, ref) =>
	props.suggests && props.suggests.length > 0 && props.getShowState ? (
		<Menu className={`searchContent${props.mobile ? 'Mobile' : ''}`} tabIndex={-1}>
			{props.suggests.map((item, index, arr) => (
				<Menu.Item onClick={() => props.onClick(item.key)} key={`search_menu_item_btn_${index}`} className={'searchMenuItem'}>
					{/* The searchMenuItemContainer is the reference point for keyboard accessibility focus changes in parent component */}
					<div className={'searchMenuItemContainer'} ref={index === 0 ? ref : null} tabIndex={index}>
						<div className={'title'}>{item.title}</div>
						{item.description && <div className={'description'}>{item.description}</div>}
						{item.tags && (
							<div className={'tag'}>
								{item.tags.map((tag, tagIndex) => (
									<Tag visible={props.getShowState} key={`tagKey_${index}_${tagIndex}`} color={Styles.BrandColor}>
										{tag}
									</Tag>
								))}
							</div>
						)}
						{arr.length - 1 !== index && <Menu.Divider />}
					</div>
				</Menu.Item>
			))}
		</Menu>
	) : null
);
