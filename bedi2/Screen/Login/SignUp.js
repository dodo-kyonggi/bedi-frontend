import React, {useState, createRef} from 'react';
import axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import 'react-native-gesture-handler';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  Keyboard,
  Modal,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

const SignUp = props => {
  const setURL = require('../Login/setURL');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [errortext2, setErrortext2] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState();
  const [certificationNumber, setCertificationNumber] = useState('');
  const [certificationNumberErr, setCertificationNumberErr] = useState();
  const [isVisible, setVisible] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const idInputRef = createRef();
  const phoneRef = createRef();
  const certificationNumberRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const nameInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');

    if (!userName) {
      alert('이름을 입력해주세요');
      return;
    }
    if (!userEmail) {
      alert('E-mail을 입력해주세요');
      return;
    }

    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    if (!phone) {
      alert('핸드폰번호를 입력해주세요');
      return;
    }
    if (!certificationNumber) {
      alert('올바른 인증번호를 입력해주세요');
      return;
    }
    if (userPasswordchk != userPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    //Show Loader
    setLoading(true);

    var dataToSend = {
      username: userName,
      email: userEmail,
      password: userPassword,
      phone: phone,
      certificationNumber: certificationNumber,
    };
    var formBody = [];

    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(setURL + '/user/signup', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        setErrortext2('');
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else if (responseJson.status === 'duplicate') {
          setErrortext2('이미 존재하는 이메일입니다.');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  if (isRegistraionSuccess) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2}}>
          <View
            style={{
              height: hp(13),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../Images/bedilogo.png')}
              style={{
                height: wp(20),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{
              height: hp(7),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: wp('4%')}}>
              회원가입이 완료되었습니다.
            </Text>
          </View>

          <View style={{height: hp(20), justifyContent: 'center'}}>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('SignIn')}>
                <Text style={{color: 'white', fontSize: wp('4%')}}>
                  로그인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.titleArea}>
          <Image
            source={require('../../Images/bedilogo.png')}
            style={{width: wp(40), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.TextArea}>
          <Text style={styles.Text}>회원가입하여 나만의 목표를 설정하고</Text>
          <Text style={styles.Text}>
            BEDI와 함께 목표를 차근차근 이뤄나가 보아요!
          </Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.textFormTop}
          placeholder={'이름(닉네임)'}
          onChangeText={UserName => setUserName(UserName)}
          ref={nameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            idInputRef.current && idInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormMiddle}
          placeholder={'아이디(이메일)'}
          onChangeText={userEmail => setUserEmail(userEmail)}
          ref={idInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormMiddle}
          secureTextEntry={true}
          placeholder={'비밀번호(8자 이상)'}
          onChangeText={UserPassword => setUserPassword(UserPassword)}
          ref={passwordInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordchkInputRef.current && passwordchkInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textFormBottom}
          secureTextEntry={true}
          placeholder={'비밀번호 확인'}
          onChangeText={UserPasswordchk => setUserPasswordchk(UserPasswordchk)}
          ref={passwordchkInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            phoneRef.current && phoneInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>

      <View style={{flex: 0.5, justifyContent: 'center'}}>
        {userPassword !== userPasswordchk ? (
          <Text style={styles.TextValidation}>
            비밀번호가 일치하지 않습니다.
          </Text>
        ) : null}
      </View>

      <View style={styles.formArea2}>
        <TextInput
          style={styles.textFormAll}
          placeholder={'핸드폰번호'}
          onChangeText={phone => setPhone(phone)}
          ref={phoneRef}
          returnKeyType="next"
          onSubmitEditing={() => certificationNumberRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Button
          title="인증번호 발송"
          titleStyle={{color: phone.length === 11 ? 'purple' : '#fff'}}
          buttonStyle={{
            backgroundColor: phone.length === 11 ? '#fff' : '#D1D1D1',
            borderColor: phone.length === 11 ? 'purple' : '#dfe4ea',
            borderWidth: 1,
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,
            padding: 10,
            width: '90%',
          }}
          onPress={(): void => {
            axios
              .post('http://beingdiligent.tk:8080/message/send', {
                phone,
              })
              .then(res => {
                if (res.status === 200) {
                  Alert.alert('인증번호가 발송되었습니다');
                }
              })
              .catch(err => {
                if (err.response.status === 400) {
                  setPhoneNumErr(err.response.data);
                }
              });
          }}
        />
      </View>
      <View style={styles.formArea3}>
        <TextInput
          style={styles.textFormAll}
          placeholder={'인증번호 입력'}
          onChangeText={certificationNumber =>
            setCertificationNumber(certificationNumber)
          }
          ref={certificationNumberRef}
          returnKeyType="next"
          onSubmitEditing={handleSubmitButton}
          blurOnSubmit={false}
        />
        <Button
          title="인증번호 확인"
          titleStyle={{
            color: certificationNumber.length === 6 ? 'purple' : '#fff',
          }}
          buttonStyle={{
            backgroundColor:
              certificationNumber.length === 6 ? '#fff' : '#D1D1D1',
            borderColor:
              certificationNumber.length === 6 ? 'purple' : '#dfe4ea',
            borderWidth: 1,
            marginBottom: 30,
            marginLeft: 20,
            marginRight: 20,
            padding: 10,
            width: '90%',
          }}
          onPress={(): void => {
            axios
              .post('http://beingdiligent.tk:8080/message/confirm', {
                certificationNumber,
                phone,
              })
              .then(res => {
                if (res.status === 200) {
                  setVisible(true);
                  Alert.alert('인증번호가 확인되었습니다');
                }
              })
              .catch(err => {
                if (err.response.status === 400) {
                  setCertificationNumberErr(err.response.data);
                }
              });
          }}
        />
      </View>

      <View style={{flex: 0.7, justifyContent: 'center'}}>
        {errortext2 !== '' ? (
          <Text style={styles.TextValidation}>{errortext2}</Text>
        ) : null}
      </View>

      <View style={{flex: 0.75}}>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn2} onPress={handleSubmitButton}>
            <Text style={{color: 'white', fontSize: wp('4%')}}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};

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

export default SignUp;
