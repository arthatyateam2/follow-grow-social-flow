
import { TrendingUp, Users } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
}

const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  const isPositive = typeof change === 'number' ? change >= 0 : false;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          
          {typeof change === 'number' && (
            <div className={`mt-2 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className={`mr-1 ${!isPositive && 'transform rotate-180'}`} />
              <span>{Math.abs(change)}% from last week</span>
            </div>
          )}
        </div>
        
        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
          {icon || <Users size={20} />}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
