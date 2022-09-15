import React, {useState, createRef} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import 'react-native-gesture-handler';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';

const SignIn = props => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    if (loading) {
      return;
    }
    if (!userId) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://beingdiligent.tk/user/login', {
        email: userId,
        password: userPassword,
      });
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      setLoading(false);
      props.navigation.replace('MainScreen');
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require('../../Images/bedilogo.png')}
            style={{width: wp(30), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>로그인을 통해 BEDI와 함께</Text>
          <Text style={styles.Text}>목표를 달성해보세요</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder={'아이디'}
          onChangeText={userId => setUserId(userId)}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormBottom}
          onChangeText={userPassword => setUserPassword(userPassword)}
          secureTextEntry={true}
          placeholder={'비밀번호'}
          returnKeyType="next"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
        {errortext != '' ? (
          <Text style={styles.TextValidation}> {errortext}</Text>
        ) : null}
      </View>
      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handleSubmitPress}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>로그인</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.TextRegister}
          onPress={() => navigation.navigate('SignUp')}>
          BEDI를 이용하시려면 회원가입이 필요합니다.
        </Text>
      </View>

      <View style={{flex: 3}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
  },
  topArea: {
    flex: 1,
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
    backgroundColor: 'white',
  },
  Text: {
    fontSize: wp('4%'),
    paddingBottom: wp('1%'),
  },
  TextValidation: {
    fontSize: wp('4%'),
    color: 'red',
    paddingTop: wp(2),
  },
  TextRegister: {
    fontSize: wp('4%'),
    color: 'grey',
    textDecorationLine: 'underline',
    paddingTop: wp(2),
  },
  formArea: {
    justifyContent: 'center',
    // paddingTop: wp(10),
    flex: 1.5,
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
  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc328',
  },
});
export default SignIn;
