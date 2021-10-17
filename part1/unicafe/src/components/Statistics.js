import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const averageScore = (good - bad) / all;
  const positivePercentage = (good / all) * 100;

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={averageScore} />
          <StatisticLine text="positive" value={`${positivePercentage} %`} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
