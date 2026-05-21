import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  BadgeDollarSign,
  BedDouble,
  Building2,
  CircleCheckBig,
  Download,
  DoorOpen,
  FileClock,
  FileUp,
  HandCoins,
  LoaderCircle,
  TriangleAlert,
} from 'lucide-react';
import StatCard from './StatCard';
import RoomStatusChart from './RoomStatusChart';
import DebtOverview from './DebtOverview';
import RevenueChart from './RevenueChart';
import { useDashboard } from '../hooks/useDashboard';
import {
  downloadDashboardImportTemplate,
  importDashboardExcel,
} from '../api/dashboardApi';
import {
  formatCompactCurrency,
  formatCount,
  formatCurrency,
  formatMonthLabel,
} from '../utils/dashboardFormat';

const DOWNLOAD_ERROR_MESSAGE =
  'Chưa tải được file mẫu. Nếu backend vừa được cập nhật, hãy khởi động lại backend rồi thử lại.';

const Dashboard = () => {
  const { stats, roomStats, debtInfo, revenue, loading, error, refetch } = useDashboard();
  const fileInputRef = useRef(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [importError, setImportError] = useState('');
  const [importResult, setImportResult] = useState(null);

  const totalRooms = Number(stats?.totalRooms ?? roomStats?.totalRooms ?? 0);
  const occupiedRooms = Number(stats?.occupiedRooms ?? roomStats?.occupiedRooms ?? 0);
  const emptyRooms = Number(stats?.emptyRooms ?? roomStats?.emptyRooms ?? 0);
  const monthlyRevenue = Number(revenue?.monthlyRevenue ?? stats?.monthlyRevenue ?? 0);
  const unpaidTenantsCount = Number(debtInfo?.unpaidTenantsCount ?? stats?.unpaidTenantsCount ?? 0);
  const totalDebt = Number(debtInfo?.totalDebt ?? stats?.totalDebt ?? 0);
  const topDebtors = Array.isArray(debtInfo?.topDebtors) ? debtInfo.topDebtors : [];

  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  const currentMonthLabel = formatMonthLabel(new Date());
  const hasAnyData =
    totalRooms > 0 ||
    occupiedRooms > 0 ||
    emptyRooms > 0 ||
    monthlyRevenue > 0 ||
    unpaidTenantsCount > 0 ||
    totalDebt > 0;

  const priorityItems = [
    unpaidTenantsCount > 0
      ? {
          icon: TriangleAlert,
          tone: 'danger',
          title: `${formatCount(unpaidTenantsCount)} khách chưa thanh toán`,
          description: 'Nên nhắc tiền trọ hoặc gửi lại hóa đơn trong hôm nay.',
        }
      : {
          icon: CircleCheckBig,
          tone: 'success',
          title: 'Chưa có khách nợ cần nhắc',
          description: 'Tình hình thu tiền đang ổn định.',
        },
    emptyRooms > 0
      ? {
          icon: DoorOpen,
          tone: 'warning',
          title: `${formatCount(emptyRooms)} phòng đang trống`,
          description: 'Có thể chuẩn bị đăng tin tìm khách để tránh thất thu.',
        }
      : {
          icon: BedDouble,
          tone: 'success',
          title: 'Tỷ lệ lấp đầy đang tốt',
          description: 'Hiện chưa có phòng trống cần xử lý gấp.',
        },
    totalDebt > 0
      ? {
          icon: HandCoins,
          tone: 'danger',
          title: `Cần thu ${formatCompactCurrency(totalDebt)}`,
          description: 'Đây là tổng công nợ còn lại chưa thu đủ.',
        }
      : {
          icon: BadgeDollarSign,
          tone: 'success',
          title: 'Chưa phát sinh công nợ',
          description: 'Khi có khoản nợ mới, hệ thống sẽ hiển thị rõ tại đây.',
        },
  ];

  const summaryText = !hasAnyData
    ? 'Hiện chưa có dữ liệu vận hành. Bạn có thể nhập nhanh file Excel để đổ dữ liệu mẫu vào hệ thống và xem dashboard nhảy số ngay.'
    : unpaidTenantsCount > 0
      ? `Hôm nay cần ưu tiên nhắc ${formatCount(unpaidTenantsCount)} khách còn thiếu tiền để giảm công nợ.`
      : emptyRooms > 0
        ? `Khu trọ đang còn ${formatCount(emptyRooms)} phòng trống, phù hợp để đẩy nhanh việc tìm khách mới.`
        : 'Tình hình vận hành đang ổn: phòng lấp đầy tốt và chưa có khoản nợ nổi bật cần xử lý ngay.';

  const statCards = [
    {
      title: 'Tổng số phòng',
      value: formatCount(totalRooms),
      subtitle: 'Tổng số phòng đang quản lý trên hệ thống.',
      icon: Building2,
      tone: 'neutral',
      badge: totalRooms > 0 ? `Đang dùng ${occupancyRate}% công suất` : 'Chưa có dữ liệu',
      to: '/rooms?view=table&status=all',
    },
    {
      title: 'Phòng đang thuê',
      value: formatCount(occupiedRooms),
      subtitle: 'Số phòng hiện có khách ở và đang phát sinh doanh thu.',
      icon: BedDouble,
      tone: 'success',
      badge: totalRooms > 0 ? `${occupancyRate}% lấp đầy` : 'Chưa có phòng',
      to: '/rooms?view=table&status=occupied',
    },
    {
      title: 'Phòng trống',
      value: formatCount(emptyRooms),
      subtitle: 'Những phòng có thể chuẩn bị dọn và đăng tin tìm khách.',
      icon: DoorOpen,
      tone: emptyRooms > 0 ? 'warning' : 'neutral',
      badge: emptyRooms > 0 ? 'Cần chú ý' : 'Ổn định',
      to: '/rooms?view=table&status=vacant',
    },
    {
      title: 'Tiền cần thu',
      value: formatCompactCurrency(totalDebt),
      subtitle: 'Tổng công nợ còn lại từ các hóa đơn chưa thanh toán.',
      icon: HandCoins,
      tone: totalDebt > 0 ? 'danger' : 'dark',
      badge: unpaidTenantsCount > 0 ? `${formatCount(unpaidTenantsCount)} khách chưa trả` : 'Đã thu đủ',
      to: '/debts',
    },
  ];

  const handleDownloadTemplate = async () => {
    try {
      setIsDownloadingTemplate(true);
      setImportError('');

      const { blob, fileName } = await downloadDashboardImportTemplate();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const backendMessage = err.response?.status === 404 ? DOWNLOAD_ERROR_MESSAGE : null;
      setImportError(backendMessage || 'Không thể tải file mẫu lúc này. Vui lòng thử lại sau.');
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event) => {
    const [file] = event.target.files || [];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      setIsImporting(true);
      setImportError('');
      const result = await importDashboardExcel(file);
      setImportResult(result);
      await refetch();
    } catch (err) {
      if (err.response?.status === 404) {
        setImportError('Backend hiện chưa có API import Excel. Hãy khởi động lại backend rồi thử nhập lại.');
      } else {
        setImportError(err.response?.data?.message || 'Không thể nhập file Excel. Vui lòng kiểm tra lại mẫu file.');
      }
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="dashboard-shell min-h-screen w-full flex-1 bg-surface-light">
      <div className="page-content page-content--wide">
        <motion.section
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="dashboard-hero"
        >
          <div className="dashboard-hero-main">
            <span className="dashboard-hero-badge">Tổng quan {currentMonthLabel}</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-ink-deep sm:text-4xl">
              Bảng điều khiển dễ nhìn, mở lên là biết ngay tình hình nhà trọ.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{summaryText}</p>

            <div className="mt-6 rounded-2xl border border-[#dfe5f2] bg-[#f8fbff] p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-base font-bold text-ink-deep">Nhập dữ liệu từ Excel để thử dashboard</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    File mẫu gồm 3 sheet: `Phòng`, `Khách thuê`, `Hóa đơn`. Import xong hệ thống sẽ tự làm mới số liệu.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    disabled={isDownloadingTemplate}
                    className="dashboard-action-button"
                  >
                    {isDownloadingTemplate ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {isDownloadingTemplate ? 'Đang tải file mẫu...' : 'Tải file mẫu'}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenFilePicker}
                    disabled={isImporting}
                    className="dashboard-action-button dashboard-action-button--primary"
                  >
                    {isImporting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
                    {isImporting ? 'Đang nhập dữ liệu...' : 'Nhập Excel'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx"
                    className="hidden"
                    onChange={handleImportFile}
                  />
                </div>
              </div>

              {importError ? (
                <div className="mt-4 rounded-2xl border border-[#f3c3d3] bg-[#fff6f9] px-4 py-3 text-sm text-ink-deep">
                  {importError}
                </div>
              ) : null}

              {importResult ? (
                <div className="mt-4 rounded-2xl border border-[#cfe7be] bg-[#f8fff0] px-4 py-4">
                  <p className="text-base font-bold text-ink-deep">{importResult.message}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    <div className="dashboard-import-chip">Phòng: {formatCount(importResult.roomsImported)}</div>
                    <div className="dashboard-import-chip">Khách: {formatCount(importResult.tenantsImported)}</div>
                    <div className="dashboard-import-chip">Hợp đồng: {formatCount(importResult.contractsImported)}</div>
                    <div className="dashboard-import-chip">Hóa đơn: {formatCount(importResult.invoicesImported)}</div>
                    <div className="dashboard-import-chip">Thanh toán: {formatCount(importResult.paymentsImported)}</div>
                  </div>
                  {Array.isArray(importResult.warnings) && importResult.warnings.length > 0 ? (
                    <div className="mt-3 rounded-2xl border border-[#f0d6a8] bg-[#fff9ee] px-4 py-3">
                      <p className="text-sm font-bold text-ink-deep">Lưu ý khi nhập</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                        {importResult.warnings.map((warning) => (
                          <li key={warning}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="dashboard-hero-metric">
                <p className="text-sm font-semibold text-muted">Tiền thu tháng này</p>
                <p className="mt-2 text-2xl font-bold text-ink-deep">{formatCompactCurrency(monthlyRevenue)}</p>
                <p className="mt-1 text-sm text-muted">{formatCurrency(monthlyRevenue)}</p>
              </div>
              <div className="dashboard-hero-metric">
                <p className="text-sm font-semibold text-muted">Khách chưa thanh toán</p>
                <p className="mt-2 text-2xl font-bold text-accent-pink">{formatCount(unpaidTenantsCount)}</p>
                <p className="mt-1 text-sm text-muted">cần theo dõi sát trong kỳ này</p>
              </div>
              <div className="dashboard-hero-metric">
                <p className="text-sm font-semibold text-muted">Tỷ lệ lấp đầy</p>
                <p className="mt-2 text-2xl font-bold text-[#4d7a14]">{occupancyRate}%</p>
                <p className="mt-1 text-sm text-muted">
                  {formatCount(occupiedRooms)}/{formatCount(totalRooms)} phòng đang thuê
                </p>
              </div>
            </div>
          </div>

          <aside className="dashboard-attention-panel">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#fff1f6] p-3 text-accent-pink">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink-deep">Cần xử lý hôm nay</h2>
                <p className="text-sm text-muted">Ưu tiên các việc quan trọng trước để không bỏ sót.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {priorityItems.map((item) => (
                <div key={item.title} className={`dashboard-attention-item dashboard-attention-item--${item.tone}`}>
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-base font-bold">{item.title}</p>
                    <p className="mt-1 text-sm leading-6">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-hairline-cloud bg-surface-light px-4 py-4">
              <div className="flex items-center gap-3">
                <FileClock className="h-5 w-5 text-accent-violet" />
                <p className="text-base font-semibold text-ink-deep">Gợi ý đọc nhanh</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                Đọc theo thứ tự: công nợ, khách chưa thanh toán, phòng trống, rồi mới xem doanh thu và tỷ lệ lấp đầy.
              </p>
            </div>
          </aside>
        </motion.section>

        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 mt-8 rounded-2xl border border-[#f3c3d3] bg-[#fff6f9] px-5 py-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-pink" />
              <div>
                <p className="text-base font-bold text-ink-deep">Chưa tải được đầy đủ dữ liệu dashboard.</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Hệ thống vẫn giữ bố cục để dễ theo dõi. Chi tiết lỗi: {error}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-hairline-cloud border-t-primary" />
            <p className="mt-4 text-base font-semibold text-muted">Đang tải dữ liệu tổng quan...</p>
          </div>
        ) : (
          <>
            <section className="mb-8 mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {statCards.map((card) => (
                <StatCard key={card.title} {...card} />
              ))}
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              <RoomStatusChart
                totalRooms={totalRooms}
                occupiedRooms={occupiedRooms}
                emptyRooms={emptyRooms}
              />
              <RevenueChart monthlyRevenue={monthlyRevenue} totalDebt={totalDebt} />
              <DebtOverview
                unpaidTenantsCount={unpaidTenantsCount}
                totalDebt={totalDebt}
                topDebtors={topDebtors}
              />
            </section>

            {!hasAnyData ? (
              <section className="dashboard-empty-state mt-8">
                <CircleCheckBig className="h-8 w-8 text-accent-violet" />
                <div>
                  <h2 className="text-xl font-bold text-ink-deep">Dashboard đã sẵn sàng</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                    Khi hệ thống có thêm phòng, hóa đơn, thanh toán hoặc công nợ, các khối số liệu sẽ tự cập nhật.
                    Bạn cũng có thể dùng ngay nút nhập Excel ở trên để kiểm tra luồng dữ liệu thật.
                  </p>
                </div>
              </section>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
