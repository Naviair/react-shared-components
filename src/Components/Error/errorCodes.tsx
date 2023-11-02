const errorCodes: { [key: string]: { header?: string; content?: string } } = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	WEBGL_NOT_AVAILABLE: {
		content:
			'<p>Application requires <a href="https://caniuse.com/#feat=webgl">WebGL support</a>.</p><p>Please ensure that you are using a supported browser/device and make sure that, <a href="https://get.webgl.org/">WebGL is activated</a>.</p>',
	},
};

export const errorCodesProxy = new Proxy(errorCodes, {
	get: (item, property) => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		return item[property as string] ? item[property as string] : { header: 'Unknown error' };
	},
});
