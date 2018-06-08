import React, { Component } from 'react'
import { StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import I18n from 'ex-react-native-i18n';
I18n.fallbacks = true

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};

export default class SignupForm extends Component {
  

  state = {
    email: '',
    password: '',
    fullName: '',
    isLoading: true,
  }

  async componentWillMount() {
    await I18n.initAsync();
    this.setState({isLoading:false})
  }
  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }
  checkForm(){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(this.state.email) === false){
      console.log("Email is Not Correct");
      Alert.alert(
        'error',
        'please pass valid email',
        [
         {text: 'OK', onPress: () => console.log('ok Pressed!')},
        ],
        { cancelable: false })
        return false;
    }else if ( (this.state.fullName === this.state.password)===false){
        Alert.alert(
        'error',
        'the passwords must be identical',
        [
         {text: 'OK', onPress: () => console.log('ok Pressed!')},
        ],
        { cancelable: false }
      )
      return false;
    }else{
      return true;
    }
    
  }
  render () {
    const { email, password, fullName } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          
          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={I18n.t('form_email')}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.mobileInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={I18n.t('form_password')}
            editable={!isLoading}
            returnKeyType={'next'}
            secureTextEntry={true}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ fullName: value })}
            isEnabled={!isLoading}
          />

          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={I18n.t('form_password_confirm')}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            //onSubmitEditing={() => this.mobileInputRef.focus()}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => this.checkForm()===true ? onSignupPress(email, password, fullName) : console.log()}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={I18n.t('form_buttton_create')}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {I18n.t('form_link_account')}
          </Text>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
