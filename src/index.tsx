/* eslint-disable @typescript-eslint/naming-convention */
import {
	Card,
	ConditionalWrapper,
	Drawer,
	Document,
	DropDown,
	Error,
	ErrorBoundary,
	GeoSearch,
	Header,
	Icon,
	LoaderSquare,
	useMap,
	Modal,
	Search,
	Skeleton,
	Nav,
	NavMobile,
	LoadOverlay,
	Views,
	Table,
	TableFilter,
	Tab,
	Layout,
} from './Components';
import { Styles } from './Styles';

/* Import local components */

/**
 * Import AntDesign custom styles
 */
import './Styles/AntDesign.less';
import './Styles/Styles.scss';

/* Split components */
const { ContentLayout, MainLayout, SingleLayout } = Layout;
const { DocumentView, PageView, MaintenanceView } = Views;

export * from './Components';
export * from './Utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useComponent = () => {
	return {
		Card,
		ConditionalWrapper,
		Drawer,
		Document,
		DropDown,
		Error,
		ErrorBoundary,
		GeoSearch,
		Header,
		Icon,
		LoaderSquare,
		useMap,
		Modal,
		Search,
		Skeleton,
		Styles,
		Nav,
		ContentLayout,
		MainLayout,
		SingleLayout,
		DocumentView,
		PageView,
		MaintenanceView,
		NavMobile,
		LoadOverlay,
		Views,
		Table,
		TableFilter,
		Tab,
	};
};

// eslint-disable-next-line import/no-default-export
export default useComponent;
/* eslint-enable @typescript-eslint/naming-convention */
