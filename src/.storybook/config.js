import { configure } from '@storybook/react';
import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const context = require.context('../stories/', true, /Example\.js$/)

function loadStories() {
    context.keys().forEach(context)
}

configure(loadStories, module);
