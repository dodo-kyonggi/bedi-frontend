import React, {useEffect} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {useCallback} from 'react';

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const percentage = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        'http://beingdiligent.tk/statistic/home',
        {
          totalPercent,
          thisMonthPercent,
          lastMonthPercent,
          showIncreaseOrDecrease,
          totalSuccessCount,
          topRank,
          last7DaysPercent,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  });

  return (
    <View>
      <Text>Ranking Screen</Text>
    </View>
  );
};
export default Statistics;
