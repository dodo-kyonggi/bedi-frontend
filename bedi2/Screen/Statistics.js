import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, Image} from 'react-native';
import 'react-native-gesture-handler';
import {useCallback} from 'react';
import Users from './MainScreens/Functions/Users';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTczNTAzNzAwIiwiZXhwIjoxNjYwOTE0NDU1LCJpYXQiOjE2NjA5MTI2NTUsInVzZXJuYW1lIjoidGVzdCBuYW1lIn0.wKM8d-YBCl-mt04GTiGD4Cesu8KUblPDyCoduAlfNCI';
const Statistics = props => {
  const [loading, setLoading] = useState(false);
  const [totalPercent, setTotalPercent] = useState('0');
  const [thisMonthPercent, setThisMonthpercent] = useState('0');
  const [lastMonthPercent, setLastMonthPercent] = useState('0');
  const [showIncreaseOrDecrease, setShowIncreaseOrDecrease] = useState('0');
  const [totalSuccessCount, setTotalSuccessCount] = useState('0');
  const [topRank, setTopRank] = useState('0');
  const [last7DaysPercent, setLast7DaysPercent] = useState('0');

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
      <Text>홍길동님의 전체 달성 퍼센트는 {totalPercent} 퍼센트입니다.</Text>
      <Text>
        홍길동님의 이번달 달성 퍼센트는 {thisMonthPercent} 퍼센트입니다.
      </Text>
      <Text>
        홍길동님의 지난달 달성 퍼센트는 {lastMonthPercent} 퍼센트입니다.
      </Text>
      <Text>
        홍길동님의 목표증가율은 {showIncreaseOrDecrease} 퍼센트입니다.
      </Text>
      <Text>홍길동님의 전체 달성개수는 {totalSuccessCount} 개 입니다.</Text>
      <Text>홍길동님의 랭킹은 {topRank} 입니다.</Text>
      <Text>
        홍길동님의 지난 7일동안 달성퍼센트는 {last7DaysPercent} 퍼센트입니다.
      </Text>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1.5,
    paddingTop: wp(2),
  },
  titleArea: {
    flex: 0.7,
    justifyContent: 'center',
    paddingTop: wp(3),
  },
  TextArea: {
    flex: 0.3,
    justifyContent: 'center',
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  alertArea: {
    height: wp(150),
  },
  Text: {
    fontSize: wp(4),
  },
  TextValidation: {
    fontSize: wp('4%'),
    color: 'red',
  },

  formArea: {
    flex: 10,
    justifyContent: 'center',
    marginTop: hp(-40),
    marginBottom: hp(-10),
  },

  formArea2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(-40),
    marginBottom: hp(-5),
  },

  formArea3: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(-5),
    marginBottom: hp(-5),
  },

  textFormTop: {
    borderWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormMiddle: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormBottom: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  textFormAll: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    width: '100%',
    height: hp(6),
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnArea: {
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  btn1: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc328',
  },
  btn2: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc328',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
