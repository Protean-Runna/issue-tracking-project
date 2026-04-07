import { ViewBox } from 'recharts/types/util/types';

type PolarViewBox = ViewBox & { cx?: number; cy?: number };
interface Props{
    viewBox?: PolarViewBox,
    title: string | number,
    value: string |number,
}


const CustomLabel:React.FC<Props> = ({viewBox, title, value}) => {
    const {cx = 0, cy = 0} = viewBox || {};
    return (
        <text x={cx} y={cy} fill="var(--gray-12)" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
            <tspan x={cx} dy="-0.80em" alignmentBaseline="middle" fontSize="24">{title}</tspan>
            <tspan x={cx} dy="1.2em" fontSize="18">{value}</tspan>
        </text>
    )

}

export default CustomLabel;