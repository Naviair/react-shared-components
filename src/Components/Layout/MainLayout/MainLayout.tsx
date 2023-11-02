import React, { Suspense } from 'react';
import './styles.scss';
import { LoadOverlay } from '../../';
import { EScreenType } from '@naviair/node-shared-interfaces';
import { ILoadOverlay } from '../../LoadOverlay';
import { LoaderSquare } from '../../LoaderSquare';

export interface IMainLayout {
	/** Show overlay while content is loading externally */
	loadOverlayProps: ILoadOverlay;
	/** Which Navbar & style to render, dependant on {@link EScreenType }. Default {@link EScreenType.DESKTOP}*/
	screenState?: EScreenType;
	/** Navbar to render */
	navbar: React.ReactNode;
	/** Header to render. */
	header: React.ReactNode;
	children?: React.ReactNode;
}

/**
 * ## MainLayout
 *
 * Renders the main layout depending on screen state (such as mobile vs desktop).
 *
 * The main layout consists of a custom stylesheet, loading behavior and Navbar display.
 *
 * Pass in the correct navbar dependant on state.
 *
 * @example <MainLayout loadOverlayProps={loadOverlayProps} screenState={getScreenState} header={<Header />} navbar={screenState.mobile ? <NavMobile /> : <Nav />}>
 *	{props.children}
 * </MainLayout>
 * @returns a full-screen div, handling LoadOverlay, header and Navbar dependant on screenState.
 */
export const MainLayout: React.FC<IMainLayout> = (props) => {
	const screenState = props.screenState ?? EScreenType.DESKTOP; //set default value to be DESKTOP

	return (
		<div className={'scMainLayout'}>
			{props.loadOverlayProps.loading && <LoadOverlay {...props.loadOverlayProps} />}
			{props.header}
			{screenState === EScreenType.MOBILE ? (
				<>
					<div className={'scMainBodyMobile'}>
						<div className={'scMainContentMobile'}>
							<Suspense fallback={<LoaderSquare />}>{props.children}</Suspense>
						</div>
					</div>
					{props.navbar} {/* mobile navbar */}
				</>
			) : (
				<div className={'scMainBody'}>
					{props.navbar} {/* regular desktop navbar */}
					<div className={'scMainContent'}>
						<Suspense fallback={<LoaderSquare />}>{props.children}</Suspense>
					</div>
				</div>
			)}
		</div>
	);
};
