import { motion } from 'framer-motion';
import { BellRing, CircleCheckBig } from 'lucide-react';
import { formatCompactCurrency, formatCount, formatCurrency } from '../utils/dashboardFormat';

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const DebtOverview = ({ unpaidTenantsCount, totalDebt, topDebtors }) => {
  const hasDebt = unpaidTenantsCount > 0 || totalDebt > 0;
  const rankedDebtors = Array.isArray(topDebtors) ? topDebtors.slice(0, 5) : [];
  const maxAmount = Math.max(...rankedDebtors.map((debtor) => Number(debtor.amount) || 0), 0);

  return (
    <motion.section variants={itemVariants} className="dashboard-section-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-[#fff1f6] p-3 text-accent-pink">
          <BellRing className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-ink-deep">Phòng cần nhắc trước</h3>
          <p className="text-sm text-muted">Sắp xếp theo mức nợ để chủ trọ biết nên nhắc phòng nào trước.</p>
        </div>
      </div>

      {hasDebt ? (
        <>
          <div className="dashboard-callout dashboard-callout--danger">
            <p className="text-sm font-semibold text-muted">Tổng quan công nợ</p>
            <p className="mt-2 text-2xl font-bold text-accent-pink">{formatCompactCurrency(totalDebt)}</p>
            <p className="mt-1 text-sm text-muted">
              {formatCount(unpaidTenantsCount)} khách / phòng cần theo dõi trong kỳ này
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {rankedDebtors.length ? (
              rankedDebtors.map((debtor, index) => {
                const amount = Number(debtor.amount) || 0;
                const barWidth = maxAmount > 0 ? Math.max((amount / maxAmount) * 100, 8) : 0;

                return (
                  <div key={`${debtor.name}-${debtor.room}-${index}`} className="dashboard-debt-row">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffe0ea] text-base font-bold text-[#b33f69]">
                        {debtor.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-ink-deep">{debtor.name || 'Chưa có tên'}</p>
                        <p className="text-sm text-muted">Phòng {debtor.room || 'chưa rõ'}</p>
                      </div>
                    </div>

                    <div className="dashboard-debt-row__content">
                      <div className="dashboard-debt-row__bar">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.7 }}
                          className="dashboard-debt-row__fill"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-accent-pink">{formatCompactCurrency(amount)}</p>
                        <p className="text-xs text-muted">{formatCurrency(amount)}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-[#f3c3d3] bg-[#fff8fb] px-4 py-5">
                <p className="text-sm leading-6 text-muted">
                  Hiện chưa có danh sách chi tiết. Khi backend trả dữ liệu công nợ, khu này sẽ tự động xếp hạng phòng cần nhắc trước.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-[#cfe7be] bg-[#f8fff0] px-4 py-5">
          <div className="flex items-start gap-3">
            <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-[#4d7a14]" />
            <div>
              <p className="text-base font-bold text-ink-deep">Hiện chưa có công nợ cần xử lý.</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Khi có phòng chưa thanh toán, danh sách ưu tiên nhắc nợ sẽ hiện tại đây.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default DebtOverview;
