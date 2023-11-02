import React, { useEffect, useState } from 'react';
import HttpStatus from 'http-status-codes';
import { Card, Icon, EIconTypes } from '../';
import { errorCodesProxy } from './errorCodes';
import { Button } from 'antd';
import { faHome } from '@fortawesome/pro-regular-svg-icons/faHome';
import { SingleLayout } from '../Layout/SingleLayout';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss';

export interface IErrorViewProps {
	/* The errorCode specified and parsed through the Route path */
	errorCode: string;
}

export interface IErrorProps {
	/* The title to be displayed upon error. */
	errorTitle: string;
	/* The text of the redirect button on the modal. */
	buttonText: string;
}

type TErrorState = {
	code: string;
	message: { header?: string; content?: string };
};

/**
 * ## Error
 * Should be rendered and passed as part of a <Route> component.
 * @example <Route path={'/error/:errorCode'} render={(props) => <Error {...props} />} />
 * @returns An error view
 */
export const Error: React.FC<IErrorProps> = (props) => {
	const [error, setError] = useState<TErrorState>();
	const { errorCode } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCode) {
			let errorMessage: { header?: string; content?: string } = {};
			try {
				errorMessage.header = HttpStatus.getStatusText(Number(errorCode));
			} catch (err) {
				errorMessage = errorCodesProxy[errorCode];
			}
			setError({ code: errorCode, message: errorMessage });
		}
	}, []);

	return (
		<SingleLayout>
			<div className={'scErrorContent'}>
				<Card fill textAlign={'center'} type={'small'} title={props.errorTitle} icon={'exclamation-circle'}>
					{error && (
						<div>
							<h3>
								{'Error'} {error.code}
							</h3>
							{error.message.header && error.message.header}
							{error.message.content && (
								<div
									dangerouslySetInnerHTML={{
										// eslint-disable-next-line @typescript-eslint/naming-convention
										__html: error.message.content,
									}}
								/>
							)}
						</div>
					)}

					<div className={'scErrorBtnContainer'}>
						<Button
							type={'primary'}
							icon={<Icon name={faHome.iconName} icon={faHome} type={EIconTypes.REGULAR} />}
							shape={'round'}
							onClick={() => navigate('/')}>
							{props.buttonText}
						</Button>
					</div>
				</Card>
			</div>
		</SingleLayout>
	);
};
