import { motion } from 'framer-motion';
import { BanknoteArrowUp } from 'lucide-react';
import { formatCompactCurrency, formatCurrency } from '../utils/dashboardFormat';

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const RevenueChart = ({ monthlyRevenue, totalDebt }) => {
  const invoiceAmount = Math.max(Number(monthlyRevenue) || 0, 0);
  const debtAmount = Math.max(Number(totalDebt) || 0, 0);
  const comparisonBase = Math.max(invoiceAmount, debtAmount, 1);
  const estimatedCollected = Math.max(invoiceAmount - Math.min(debtAmount, invoiceAmount), 0);

  const rows = [
    {
      key: 'invoice',
      label: 'Đã lên hóa đơn tháng này',
      amount: invoiceAmount,
      color: 'linear-gradient(90deg, #2f7f32 0%, #b8e436 100%)',
      toneClass: 'text-[#2f7f32]',
    },
    {
      key: 'debt',
      label: 'Công nợ còn lại',
      amount: debtAmount,
      color: 'linear-gradient(90deg, #ff9abb 0%, #d94d7e 100%)',
      toneClass: 'text-accent-pink',
    },
  ];

  return (
    <motion.section variants={itemVariants} className="dashboard-section-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-[#eef1ff] p-3 text-accent-violet">
          <BanknoteArrowUp className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-ink-deep">Tiền tháng này</h3>
          <p className="text-sm text-muted">Chỉ hiển thị số tiền đã lên hóa đơn và phần công nợ còn lại để dễ nhìn nhanh.</p>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.key} className="dashboard-money-row">
            <div className="flex items-center justify-between gap-4">
              <p className="text-base font-semibold text-ink-deep">{row.label}</p>
              <p className={`text-lg font-bold ${row.toneClass}`}>{formatCompactCurrency(row.amount)}</p>
            </div>
            <div className="dashboard-money-row__bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(row.amount / comparisonBase) * 100}%` }}
                transition={{ duration: 0.8 }}
                className="dashboard-money-row__fill"
                style={{ background: row.color }}
              />
            </div>
            <p className="text-sm text-muted">{formatCurrency(row.amount)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="dashboard-legend-card">
          <div>
            <p className="text-sm font-semibold text-muted">Ước tính đã thu</p>
            <p className="mt-2 text-xl font-bold text-[#2f7f32]">{formatCompactCurrency(estimatedCollected)}</p>
          </div>
          <p className="text-sm text-muted">{formatCurrency(estimatedCollected)}</p>
        </div>
        <div className="dashboard-legend-card">
          <div>
            <p className="text-sm font-semibold text-muted">Tình trạng hiện tại</p>
            <p className="mt-2 text-xl font-bold text-ink-deep">
              {debtAmount > 0 ? 'Còn khách chưa trả đủ' : 'Đã thu ổn'}
            </p>
          </div>
          <p className="text-sm text-muted">
            {debtAmount > 0 ? `Còn ${formatCurrency(debtAmount)} cần theo dõi` : 'Chưa có khoản nợ nổi bật'}
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default RevenueChart;
