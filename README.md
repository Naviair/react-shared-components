<h1> react-shared-components</h1>

Shared Components is a collection of components for use in various Naviair projects. It makes cross project sharing simple and easy,  
suggesting reuse of components rather than reimplementation.

You should put a new component here, when it is reusable, and when there is a probability that this could be used somewhere in the  
future in other projects.

- [Running the project](#running-the-project)
	- [.npmrc](#npmrc)
- [Integrations](#integrations)
- [Specific to this repository](#specific-to-this-repository)
	- [Noteworthy files](#noteworthy-files)
	- [Folder structure](#folder-structure)
	- [Using Storybook](#using-storybook)
- [BUG: Storybook and mapbox](#bug-storybook-and-mapbox)
- [VERSION 3.0.0](#version-300)

## Running the project

1. Clone
2. `npm install`
3. Run one of the available scripts in [package.json](package.json)

To preview and see more elaborate component documentation, you can run storybook with `npm run storybook`

### .npmrc

To run the application locally, you need to add a .npmrc file with access-token to GitHub and Fontawesome.

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=YOUR-TOKEN

@naviair:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR-TOKEN
```

## Integrations

- ESLint (`npm run lint`)
- Prettier
- Storybook
- node-shared-interfaces
- FontAwesome (icons)

## Specific to this repository

### Noteworthy files

VSCode settings can be found in [.vscode](.vscode).   
ESLint setup can be found in [eslintrc.json](.eslintrc.json).  
Code formatting is done using the VSCode `Prettier` extension. See [.prettierrc.json](.prettierrc.json).  
App-wide styles and variables can be found in [src/Styles](src/Styles).

### Folder structure

Make sure to adhere to the folder structure already in place when implementing new components.

Looking at the files in [src/](src/), you'll notice a pattern of subfolders containing usually very few files and then the stylesheet (`styles.scss`) for the given component. This structure enforces the design principle of _low coupling, high cohesion_ while promoting generic, re-usable components.

Divide files into multiple where the overall implementation can benefit from it.

### Using Storybook

To preview and see more elaborate component documentation, you can run storybook with `npm run storybook`.

When documenting new components with Storybook, you should create a file `<Component>.stories.tsx`. This is the story-file that will define the documentation for the specific component. Every story should be placed in `./stories`. A story file has full React support for elaborate documentation.

**Export default**  
Each story should contain an `export default` object, which determines where your story goes in the story list. As an example, see the export default object from the DropDown component:

```ts
export default {
	title: 'Components/DropDown', //Story title prefixed by location and folder structure*
	component: DropDown, //import { DropDown } from '..'
	parameters: {
		layout: 'centered', //center the component on canvas page
		docs: {
			page: () => (
				<>
					//default components from @storybook/addon-docs
					<Title />
					<Description> Dropdown implementation using Ant Design </Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta;
```

**\*** the `title` prop should be always be prefixed "Components" (unless it is not a component) and then by folder structure. Another example could be a DocumentView inside the Views folder, which should be titled `Components/Views/DocumentView`.

The docs.page parameter defines the components that will be rendered on the `docs` page, which is found on every component documentation. The components that are rendered, are default components from `@storybook/addon-docs`, and serves as a default page composition. How you wish to build your docs page, is up to you, and there are [many other ways](https://storybook.js.org/docs/react/writing-docs/docs-page) to do so.  
A full list of parameter options in `export default` that can be used to build your docs page, and customize your story can be found here:

- [Args](https://storybook.js.org/docs/react/writing-stories/args)
- [Parameters](https://storybook.js.org/docs/react/writing-stories/parameters)
- [Decorators](https://storybook.js.org/docs/react/writing-stories/decorators)
- [Loaders](https://storybook.js.org/docs/react/writing-stories/loaders)

**Render template**  
Templates defines the behavior of our example. See the template from DropDown:

```ts
const Template: Story<ComponentProps<typeof DropDown>> = (props) => {
	return (
		<DropDown
			{...props}
			overlay={
				<Antd.Menu>
					<Antd.Menu.Item key={'1'}>
						<Antd.Typography.Text>
							<Antd.Row>Profile</Antd.Row>
						</Antd.Typography.Text>
					</Antd.Menu.Item>
			}></DropDown>
	);
};
```

This will render a simple Antd DropDown component with a Profile item as example. The template can be treated as a usual react functional component. It is important to include `{...props}` and leave them unset. They should be set as described in the next section for full functionality, unless you want to set some default for a prop for every story example.

**Creating examples**  
In order to make a working dynamic example, we will need to set the props of our element.
See DropDown below:

```ts
//Interface included for reference

/**
 * @param onClick onClick handler for the dropdown button
 * @param icon Icon to be rendered as dropdown button
 * @param overlay The DropDown content. Required Antd Prop
 * extends {@link DropDownProps}
 */
export interface IDropDownProps extends DropDownProps {
	onClick?: () => void;
	overlay: JSX.Element;
	icon?: IconName;
}

interface DropDownProps {
    ... // lots of other props
    trigger: ('click' | 'hover' | 'contextMenu')[]
    ... // lots of other props
}

//Example props
export const Example = Template.bind({});
Example.props = {
	trigger: ['hover'],
	icon: 'user',
};
```

In this example we set the DropDown to trigger on `hover`, and we set the icon to `user`.  
Multiple examples can be easily created, by defining another example expression:

```ts
export const ExampleClick = Template.bind({});
ExampleClick.props = {
	trigger: ['click'],
	icon: 'user',
};
```

The props set in the examples are fully interactable, and can be played around with in the storybook GUI.

## BUG: Storybook and mapbox

If there are problems with running Storybook, the solution is:

1. Delete `node-modules` and `package-lock.json`
2. Run `npm i` (see note below 'It still doesn't work)
3. Run `npm i mapbox-gl`
4. Run `npm run storybook`

**It still doesn't work**
Repeat the process, but this time run `npm i --legacy-peer-deps` at step 2. This makes sure that compatible (legacy) dependencies are installed.

**npm7**
If you have updated to `npm 7.x.x`, you will have to downgrade to `npm 6.x.x`. The recommended version which is tested on multiple machines is `npm@6.14.13`. This is until Storybook gets their dependencies updated.

Now everything should work. Even though mapbox-gl is a dependency in `package.json`, it is not certain that it is installed correctly via `npm i`. Therefore it is done manually.

## VERSION 3.0.0

Library updated to support React v18 AND React-Router v6. May contain breaking changes in projects that are not ready for this change, so be cautious.

