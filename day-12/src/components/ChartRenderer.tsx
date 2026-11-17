import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

const DEMO_DATA = {
  revenue: [
    { month: 'Jan', revenue: 42000 }, { month: 'Feb', revenue: 53000 },
    { month: 'Mar', revenue: 68000 }, { month: 'Apr', revenue: 75000 }
  ],
  traffic: [
    { day: 'Mon', organic: 4000, direct: 2400 }, { day: 'Tue', organic: 3000, direct: 1398 },
    { day: 'Wed', organic: 5000, direct: 3800 }
  ],
  cpu: [
    { time: '00:00', cpu: 32 }, { time: '04:00', cpu: 28 },
    { time: '08:00', cpu: 65 }, { time: '12:00', cpu: 85 }
  ],
  regions: [
    { name: 'NA', value: 45, color: '#6366f1' }, { name: 'EU', value: 30, color: '#3b82f6' },
    { name: 'APAC', value: 25, color: '#06b6d4' }
  ],
  funnel: [
    { subject: 'Visits', A: 120 }, { subject: 'Signups', A: 98 }, { subject: 'Sales', A: 85 }
  ]
};

export const ChartRenderer = ({ type, darkMode }: { type: string, darkMode: boolean }) => {
  const gridStroke = darkMode ? '#1e293b' : '#e2e8f0';
  const textStroke = darkMode ? '#64748b' : '#94a3b8';
  const chartHeight = 130;

  switch (type) {
    case 'area':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart data={DEMO_DATA.revenue}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={textStroke} fontSize={10} />
            <Area type="monotone" dataKey="revenue" fill="#6366f1" stroke="#6366f1" />
          </AreaChart>
        </ResponsiveContainer>
      );
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={DEMO_DATA.traffic}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke={textStroke} fontSize={10} />
            <Bar dataKey="organic" fill="#3b82f6" />
            <Bar dataKey="direct" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      );
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart data={DEMO_DATA.cpu}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke={textStroke} fontSize={10} />
            <Line type="monotone" dataKey="cpu" stroke="#f43f5e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie data={DEMO_DATA.regions} dataKey="value" innerRadius={35} outerRadius={55}>
              {DEMO_DATA.regions.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    case 'radar':
      return (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <RadarChart data={DEMO_DATA.funnel}>
            <PolarGrid stroke={gridStroke} />
            <PolarAngleAxis dataKey="subject" stroke={textStroke} fontSize={10} />
            <Radar dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
};
