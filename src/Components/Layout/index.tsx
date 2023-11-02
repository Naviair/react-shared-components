/* eslint-disable @typescript-eslint/naming-convention */
export * from './ContentLayout';
export * from './MainLayout';
export * from './SingleLayout';

import { ContentLayout } from './ContentLayout';
import { MainLayout } from './MainLayout';
import { SingleLayout } from './SingleLayout';

export const Layout = {
	ContentLayout,
	MainLayout,
	SingleLayout,
};
