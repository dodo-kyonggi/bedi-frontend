import React, {useCallback, useRef, useState} from 'react';
import {Overlay} from 'react-native-elements';
import {
  ActivityIndicator,
  StatusBar,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import axios from 'axios';
import Config from 'react-native-config';
import {Button} from 'react-native';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneNumErr, setPhoneNumErr] = useState();
  const [certificationNumber, setCertificationNumber] = useState('');
  const [certificationNumberErr, setCertificationNumberErr] = useState();
  const [isVisible, setVisible] = useState(false);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const certificationNumberRef = useRef();

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangePhone = useCallback(text => {
    setPhone(text.trim());
  }, []);
  const onChangeCertificationNumber = useCallback(text => {
    setCertificationNumber(text.trim());
  }, []);
  const onChangeName = useCallback(text => {
    setUserName(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    } //요청가지않게 막아주기
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!username || !username.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (!phone || !phone.trim()) {
      return Alert.alert('알림', '핸드폰 번호를 입력해주세요.');
    }
    if (!certificationNumber || !certificationNumber.trim()) {
      return Alert.alert('알림', '인증번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, username, password, phone, certificationNumber);

    try {
      setLoading(true);
      console.log(Config.API_URL);
      //http메서드 : get, put, patch, post, delete, head, options
      const response = await axios.post(`${Config.API_URL}/user/signup`, {
        email,
        username,
        password,
      });
      console.log(response.data);
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        Alert.alert('알림', error.response.data.errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [navigation, loading, email, username, password]);

  const canGoNext = email && username && password;
  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => phoneRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>휴대폰 인증</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePhone}
          placeholder="휴대폰 번호를 입력해주세요"
          placeholderTextColor="#666"
          textContentType="phoneNumber"
          value={phone}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={phoneRef}
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
              .post(`${Config.API_URL}/message/send`, {
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
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeCertificationNumber}
          placeholder="인증번호를 입력해주세요 예) 123456"
          placeholderTextColor="#666"
          textContentType="certificationNumber"
          value={certificationNumber}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={certificationNumberRef}
          onSubmitEditing={() => nameRef.current?.focus()}
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
              .post(`${Config.API_URL}/message/confirm`, {
                certificationNumber,
                phone,
              })
              .then(res => {
                if (res.status === 200) {
                  setVisible(true);
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
      <Overlay
        isVisible={isVisible}
        height={100}
        width={220}
        onBackdropPress={(): void => setVisible(false)}>
        <View style={{flex: 1}}>
          <Text style={{alignSelf: 'center', fontSize: 15, marginTop: 10}}>
            휴대폰 번호가 인증되었습니다
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}>
            <Button
              title="완료"
              onPress={(): void => {
                setVisible(false);
                props.navigation.navigate('SignUp', {
                  mobiletest: phone,
                });
              }}
              type="clear"
            />
          </View>
        </View>
      </Overlay>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={username}
          textContentType="username"
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={onChangePassword}
          value={password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            canGoNext
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          //여기에 loading 넣어주는거 매우 중요
          disabled={!canGoNext || loading}
          onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator color="gray" />
          ) : (
            <Text style={styles.loginButtonText}>회원가입</Text>
          )}
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUp;
