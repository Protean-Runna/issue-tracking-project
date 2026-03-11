import { Text } from '@radix-ui/themes';
interface Props {
    date: string | Date | undefined;
}

const DateFormat = ({date}: Props) => {
    if (!date) return <Text as='span'>N/A</Text>;

    const dateObject = typeof date === 'string' ? new Date(date) : date;

    return <Text as='span'>{dateObject.toDateString()}</Text>;

}

export default DateFormat;