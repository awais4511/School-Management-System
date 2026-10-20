import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdBarChart, MdCheckCircle, MdAssignment, MdAttachMoney, MdEvent, MdMessage } from "react-icons/md";
import { feeRecords } from "../../mockdata/parentFeesData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/parent" },
  { icon: <MdBarChart />, label: "Progress", path: "/dashboard/parent/progress" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/parent/attendance" },
  { icon: <MdAssignment />, label: "Results", path: "/dashboard/parent/results" },
  { icon: <MdAttachMoney />, label: "Fees", path: "/dashboard/parent/fees" },
  { icon: <MdEvent />, label: "Events", path: "/dashboard/parent/events" },
  { icon: <MdMessage />, label: "Messages", path: "/dashboard/parent/messages" },
];

const statusColor = (status) => {
  if (status === "paid") return "bg-green-100 text-green-700";
  if (status === "pending") return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
};

export default function Fees() {
  const totalDue = feeRecords.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.total, 0);
  const totalPaid = feeRecords.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.total, 0);

  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <div className="bg-gradient-to-r from-emerald-700 to-green-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Fee Management</h2>
          <p className="text-emerald-200 text-sm mt-1">Track and manage school fees</p>
        </div>
        <MdAttachMoney className="text-6xl opacity-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white shadow">
          <p className="text-red-200 text-xs">Amount Due</p>
          <p className="text-3xl font-bold mt-2">Rs {totalDue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow">
          <p className="text-green-200 text-xs">Amount Paid</p>
          <p className="text-3xl font-bold mt-2">Rs {totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow">
          <p className="text-blue-200 text-xs">Next Due Date</p>
          <p className="text-lg font-bold mt-2">May 31, 2026</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-base">Fee Records</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-700">Month</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Tuition</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Transport</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Activities</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Total</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{record.month}</td>
                  <td className="px-5 py-4 text-sm text-center text-slate-700">Rs {record.tuition.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-center text-slate-700">Rs {record.transport.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-center text-slate-700">Rs {record.activities.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm font-bold text-center text-slate-800">Rs {record.total.toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(record.status)}`}>
                      {record.status === "paid" ? "Paid" : record.status === "pending" ? "Pending" : "Overdue"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {record.status === "pending" ? (
                      <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded transition-colors">
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500">
                        {record.paidDate}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
