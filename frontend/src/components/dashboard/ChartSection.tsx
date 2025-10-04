import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "Bone & Musculoskeletal", studies: 120 },
  { category: "Stem Cells", studies: 95 },
  { category: "Neurobiology", studies: 78 },
  { category: "Cardiovascular", studies: 66 },
  { category: "Genomics", studies: 48 },
];

export default function ChartSection() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-lg mb-4">
        Publications by Research Focus
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="studies" fill="#2563eb" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
