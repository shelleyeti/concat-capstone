import React, { Component } from 'react';
import StepOneUserDetails from './stepOne-UserDetails';
import StepTwoClassDetails from './stepTwo-ClassDetails';
import StepThreeImage from './stepThree-Image'
import StepConfirmation from './stepConfirmation';
import StepSuccess from './stepSuccess';
// import './dashboard.css';

export default class StepRegisterContainer extends Component {
  state = {
    step: 1,
    name: "",
    username: "",
    email: "",
    password: null,
    image: "",
    blurb: "",
    available: "",
    classId: "",
    student: false
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  }

  handleChangeImage = input => event => {
    this.setState({ [input]: event.target.file[0] })
  }

  render() {
    const { step } = this.state;
    const { name, username, email, password, image, blurb, available, classId, student } = this.state;
    const values = { name, username, email, password, image, blurb, available, classId, student };
    switch (step) {
      case 1:
        return <StepOneUserDetails
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          values={ values }
        />
      case 2:
        return <StepTwoClassDetails
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          handleChange={ this.handleChange }
          values={ values }
        />
      case 3:
        return <StepThreeImage
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          handleChange={ this.handleChangeImage }
          values={ values }
        />
      case 4:
        return <StepConfirmation
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          values={ values }
        />
      case 5:
        return <StepSuccess />
    }
  }
}