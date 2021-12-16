import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Whisper, Tooltip } from 'rsuite';

import Styles from './HeatGridChart.module.less';

const getStat = () => {
  return new Promise((resolve) => {
    const data = {
      daily_memo_count: {
        '2021/11/23': 1,
        '2021/11/13': 1,
        '2021/12/03': 10,
      },
    };

    setTimeout(() => {
      resolve(data);
    }, 300);
  });
};

interface HeatGridStatProps {
  daily_memo_count: Record<string, any>;
}

const HeatGridChart = () => {
  const [heatGridDayArr, setHeatGridDayArr] = React.useState<string[][]>([]);
  const [heatGridMonthArr, setHeatGridMonthArr] = React.useState<string[]>([]);
  const [heatGridStat, setHeatGridStat] = React.useState<HeatGridStatProps>({
    daily_memo_count: {},
  });

  React.useEffect(() => {
    const endOfCurrentWeek = dayjs().endOf('week').format('YYYY/MM/DD');

    let fnDay = endOfCurrentWeek;
    const totalDayArr = [];
    for (let x = 0; x < 12; x++) {
      const dayArr = [];
      for (let y = 0; y < 7; y++) {
        dayArr.push(fnDay);
        fnDay = dayjs(fnDay).subtract(1, 'day').format('YYYY/MM/DD');
      }
      totalDayArr.push(dayArr);
    }
    totalDayArr.reverse();
    const curHeatGridDayArr = totalDayArr.map((week) => {
      return week.reverse();
    });
    setHeatGridDayArr(curHeatGridDayArr);

    const curHeatGridMonthArr = curHeatGridDayArr
      .map((week) => {
        return [...week].pop();
      })
      .map((date) => {
        return dayjs(date).format('MMM');
      })
      .reduce((acc: string[], cur) => {
        if (acc.includes(cur)) return [...acc, ''];
        return [...acc, cur];
      }, []);
    setHeatGridMonthArr(curHeatGridMonthArr);
  }, []);

  React.useEffect(() => {
    getStat().then((res) => {
      setHeatGridStat(res);
    });
  }, []);

  return (
    <>
      <div className={Styles.heatGrid}>
        {heatGridDayArr.map((week, x) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={x} className={Styles.week}>
              {week.map((day, y) => {
                const today = day === dayjs().format('YYYY/MM/DD') ? Styles.today : '';

                let curMemoCount = 0;
                const { daily_memo_count } = heatGridStat;
                if (Object.keys(daily_memo_count).includes(day)) {
                  curMemoCount = daily_memo_count[day];
                }

                const memoDepth =
                  curMemoCount > 0 && curMemoCount < 5
                    ? Styles.lightGreen
                    : curMemoCount >= 5 && curMemoCount < 10
                    ? Styles.green
                    : curMemoCount >= 10
                    ? Styles.darkGreen
                    : '';

                const tooltip = (
                  <Tooltip>
                    <p className={'py-1'}>
                      {curMemoCount} memo on {day}
                    </p>
                  </Tooltip>
                );

                return (
                  <Whisper
                    // eslint-disable-next-line react/no-array-index-key
                    key={y}
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltip}
                    delay={300}
                  >
                    <div className={classNames(Styles.day, today, memoDepth)} />
                  </Whisper>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={classNames(Styles.heatGrid, Styles.monthBox)}>
        {heatGridMonthArr.map((month, z) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={z} className={Styles.month}>
              {month}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeatGridChart;
