import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { isUndefined } from 'lodash';

import { db } from '@/store/db';
import MineStoreContainer from '@/store/MineStoreContainer';
import HeatGridChart from '../../components/HeatGridChart';

dayjs.extend(isBetween);

const Stat = () => {
  const { memoList } = MineStoreContainer.usePicker(['memoList']);

  const [HeatGridChartData, setHeatGridChart] = React.useState({});

  const renderStats = async () => {
    const list = await db.memo.orderBy('created_at').reverse().toArray();

    const endDay = dayjs().endOf('week').format('YYYY/MM/DD');
    const startDay = dayjs(endDay).subtract(83, 'day').format('YYYY/MM/DD');

    const obj: Record<string, number> = {};

    for (let i = 0, len = list.length; i < len; i += 1) {
      const item = list[i];

      const created_at = dayjs(item.created_at).format('YYYY/MM/DD');
      const updated_at = dayjs(item.updated_at).format('YYYY/MM/DD');

      if (dayjs(created_at).isBefore(dayjs(startDay))) break;

      if (isUndefined(obj[created_at])) {
        obj[created_at] = 1;
      } else {
        obj[created_at] += 1;
      }

      if (dayjs(updated_at).isBetween(startDay, endDay, null, '[]')) {
        if (isUndefined(obj[updated_at])) {
          obj[updated_at] = 1;
        } else {
          if (updated_at !== created_at) obj[updated_at] += 1;
        }
      }
    }

    setHeatGridChart(obj);
  };

  React.useEffect(() => {
    renderStats();
  }, [memoList]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <HeatGridChart data={HeatGridChartData} />
    </div>
  );
};

export default Stat;
