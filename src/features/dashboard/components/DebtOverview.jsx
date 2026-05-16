import React from 'react';
import { motion } from 'framer-motion';
import { WalletCards } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const DebtOverview = ({ unpaidTenantsCount, totalDebt, topDebtors }) => {
  return (
    <motion.div variants={itemVariants} className="card-compact">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-accent-pink/15 p-2">
            <WalletCards className="h-5 w-5 text-accent-pink" />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink-deep">Tình hình công nợ</h3>
        </div>
        <span className="pill-violet text-[10px] font-semibold uppercase tracking-wide">
          {unpaidTenantsCount} khách nợ
        </span>
      </div>

      <div className="mb-6">
        <p className="mb-1 text-sm font-medium text-muted">Tổng nợ cần thu</p>
        <p className="font-display text-3xl font-bold text-accent-pink">
          {(totalDebt / 1000000).toLocaleString('vi-VN')}
          <span className="ml-1 text-xl text-accent-pink/70">Tr</span>
        </p>
      </div>

      {topDebtors && topDebtors.length > 0 && (
        <div>
          <p className="eyebrow mb-3 text-muted">Danh sách nợ chú ý</p>
          <div className="space-y-3">
            {topDebtors.map((debtor, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-hairline-cloud bg-surface-press p-3 transition-colors hover:bg-surface-press-strong"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-violet-mid font-bold text-on-primary">
                    {debtor.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-deep">{debtor.name}</p>
                    <p className="text-xs font-medium text-muted">Phòng {debtor.room}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-accent-pink">
                  {(debtor.amount / 1000000).toLocaleString('vi-VN')}M
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DebtOverview;
