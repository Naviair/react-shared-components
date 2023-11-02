import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description> Calendar </Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Calendar>>;

/* Test logic  */
const getListData = (value: Dayjs) => {
	let listData;
	switch (value.date()) {
		case 8:
			listData = [
				{ type: 'warning', content: 'This is warning event.' },
				{ type: 'success', content: 'This is usual event.' },
			];
			break;
		case 10:
			listData = [
				{ type: 'warning', content: 'This is warning event.' },
				{ type: 'success', content: 'This is usual event.' },
				{ type: 'error', content: 'This is error event.' },
			];
			break;
		case 15:
			listData = [
				{ type: 'warning', content: 'This is warning event' },
				{ type: 'success', content: 'This is very long usual event。。....' },
				{ type: 'error', content: 'This is error event 1.' },
				{ type: 'error', content: 'This is error event 2.' },
				{ type: 'error', content: 'This is error event 3.' },
				{ type: 'error', content: 'This is error event 4.' },
			];
			break;
		default:
	}
	return listData || [];
};

const dateCellRender = (value: Dayjs) => {
	const listData = getListData(value);
	return (
		<div style={{ overflow: 'hidden' }}>
			{listData.map(() => (
				<>
					<div style={{ backgroundColor: '#96ae09', display: 'flex', margin: 2, borderRadius: 4, color: '#fff', padding: 2 }}>
						<div style={{ flex: 3, textAlign: 'center' }}>1234</div>
						<div style={{ flex: 1, textAlign: 'left' }}>-</div>
						<div style={{ flex: 12 }}>Flyvning nær EKOD {/* <Badge status={item.type as BadgeProps['status']} text={item.content} /> */}</div>
					</div>
					<div style={{ backgroundColor: '#96ae09', display: 'flex', margin: 2, borderRadius: 4, color: '#fff', padding: 2 }}>
						<div style={{ flex: 3, textAlign: 'center' }}>923</div>
						<div style={{ flex: 1, textAlign: 'left' }}>-</div>
						<div style={{ flex: 12 }}>Inspektion af hus {/* <Badge status={item.type as BadgeProps['status']} text={item.content} /> */}</div>
					</div>
				</>
			))}
		</div>
	);
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Calendar>> = () => {
	return <Calendar dateCellRender={dateCellRender} />;
};

export const Small = Template.bind({});
