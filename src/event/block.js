import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import edit from './edit';

registerBlockType( 'eventbird/event', {
	title: __( 'Event' ), // Block title.
	icon: 'calendar-alt',
	category: 'common',

	attributes: {
		startDate: {
			type: 'string',
			source: 'meta',
			meta: 'eventbird_start_date'
		}
	},

	edit,

	save: function({ attributes }) {
		const { startDate } = attributes;

		const foo = (bar) => { 'bar is ' + bar; }
		
		return (
			<div>
				<span>Start Date:</span>
				<p>{ foo(startDate) }</p>
			</div>
		);
	},
} );
