import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend
} from "recharts";

const LineCharts = ({
  data,
}: {
  data: { name: string; total: number }[] | undefined;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Tooltip wrapperClassName="!bg-white z-20 dark:!bg-neutral-900 rounded-md" />
        <Legend />
        <Line
          type={"monotone"}
          dataKey={"total"}
          stroke="#00bba7"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharts;
