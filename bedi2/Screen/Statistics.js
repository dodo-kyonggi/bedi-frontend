import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import 'react-native-gesture-handler';
import {useCallback} from 'react';
import * as users from './MainScreens/Functions/Users';
import * as mypageUsers from './Mypage/Function/Users';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTczNTAzNzAwIiwiZXhwIjoxNjYwOTE0NDU1LCJpYXQiOjE2NjA5MTI2NTUsInVzZXJuYW1lIjoidGVzdCBuYW1lIn0.wKM8d-YBCl-mt04GTiGD4Cesu8KUblPDyCoduAlfNCI';
const Statistics = props => {
  const [loading, setLoading] = useState(false);
  const [totalPercent, setTotalPercent] = useState('');
  const [thisMonthPercent, setThisMonthpercent] = useState('');
  const [lastMonthPercent, setLastMonthPercent] = useState('');
  const [showIncreaseOrDecrease, setShowIncreaseOrDecrease] = useState('');
  const [totalSuccessCount, setTotalSuccessCount] = useState('');
  const [topRank, setTopRank] = useState('');
  const [last7DaysPercent, setLast7DaysPercent] = useState('');

  const percentage = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        'http://beingdiligent.tk/statistic/home',
        {
          totalPercent: totalPercent,
          thisMonthPercent: thisMonthPercent,
          lastMonthPercent: lastMonthPercent,
          showIncreaseOrDecrease: showIncreaseOrDecrease,
          totalSuccessCount: totlaSuccessCount,
          topRank: topRank,
          last7DaysPercent: last7DaysPercent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
      <View style={styles.boxZone1}>
        <Text style={styles.titleText}>
          '<Text style={styles.smallText}>홍길동</Text>' 님의
        </Text>
      </View>
      <View>
        <View style={styles.boxZone2}>
          <Text style={styles.mainText}>
            전체 달성 퍼센트 : {totalPercent} %
          </Text>
        </View>
        <View style={styles.boxZone2}>
          <Text style={styles.mainText}>
            이번달 달성 퍼센트 : {thisMonthPercent} %
          </Text>
        </View>
        <View style={styles.boxZone2}>
          <Text style={styles.mainText}>
            지난달 달성 퍼센트 : {lastMonthPercent} %
          </Text>
        </View>
        <View style={styles.boxZone2}>
          <Text style={styles.mainText}>
            지난 7일동안 달성퍼센트 : {last7DaysPercent} %
          </Text>
        </View>
        <View style={styles.boxZone2}>
          <Text style={styles.mainText}>
            목표증가율 : {showIncreaseOrDecrease} %
          </Text>
        </View>
        <View style={styles.boxZone2}>
          <Text style={styles.mainText}>
            전체 달성개수 : {totalSuccessCount} 개
          </Text>
        </View>
        <View style={styles.boxZone3}>
          <Text style={styles.bottomText}>
            랭킹은 <Text style={styles.smallText}>{topRank} </Text>입니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  boxZone1: {
    padding: 20,
    backgroundColor: '#FFFFF2',
  },
  boxZone2: {
    padding: 20,
  },
  boxZone3: {
    padding: 40,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  mainText: {
    fontSize: 20,
  },
  smallText: {
    color: 'orange',
  },
  bottomText: {
    fontSize: 30,
    textAlign: 'center',
  },
});
