export const formatTimeAndDate = (
	date: Date
): { dateString: string; timeString: string } => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	};
	const dateString = date.toLocaleDateString('hr-HR', options);
	const timeString = date.toLocaleTimeString('hr-HR', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return { dateString, timeString };
};
