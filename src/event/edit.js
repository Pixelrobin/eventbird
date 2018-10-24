const { Component } = wp.element;

const { DatePicker, Button, Dropdown } = wp.components;
const { getSettings } = wp.date;
const { withState } = wp.compose;

//const { memoize } = _;

const encodeDate = (date) => {
	return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

const decodeDate = (dateString) => {
	return moment(dateString, 'YYYY-MM-DD HH:mm:ss').toDate();
}

const EventBirdDateTime = ({ date, onChange }) => {
	const settings = getSettings();

	// Regex magic from the docs
	const is12HourTime = /a(?!\\)/i.test(
		settings.formats.time
			.toLowerCase()
			.replace( /\\\\/g, '' )
			.split( '' ).reverse().join( '' )
	);

	return (
		<Dropdown
			className="eventbird-dropdown"
			contentClassName="eventbird-dropdown__content"
			position="bottom right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button isLink onClick={ onToggle } aria-expanded={ isOpen }>
					{ encodeDate(date) }
				</Button>
			)}

			renderContent={ () => (
				<DatePicker
					currentDate={ date }
					onChange={ (date) => {
						onChange(date);
					} }
					locale={ settings.l10n.locale }
					is12Hour={ is12HourTime }
				/>
			)}
		/>
	);
}

const EventBirdEventEdit = ({attributes, setAttributes}) => {
	const { startDate } = attributes;

	const startDateObject = startDate ? decodeDate(startDate) : new Date();

	return(
		<EventBirdDateTime
			onChange={ (date) => {
				setAttributes({ startDate: encodeDate(date) });
			}}
			date={ startDateObject }
		/>
	)
}
export default EventBirdEventEdit;