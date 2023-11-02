import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import * as Sentry from '@sentry/react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * ## ErrorBoundary
 * Error wrapper div for Naviair projects.
 * @returns An error handler for unexpected errors
 */
export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const navigate = useNavigate();
	const openNotification = () => {
		notification['error']({
			message: 'Der opstod en fejl!',
			description: (
				<>
					{'Prøv at genindlæse ved at klikke '}
					<a href={'/'}>{'her'}</a>
				</>
			),
			duration: 0,
		});
	};

	useEffect(() => {
		//Unsupported WebGL
		if (!mapboxgl.supported()) {
			navigate('/error/WEBGL_NOT_AVAILABLE');
		}
	}, []);

	return <Sentry.ErrorBoundary onError={() => openNotification()}>{children}</Sentry.ErrorBoundary>;
};
