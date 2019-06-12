import React, { Component } from 'react';
import StepOneUserDetails from './stepOne-UserDetails';
import StepTwoClassDetails from './stepTwo-ClassDetails';
import StepThreeImage from './stepThree-Image';
import StepConfirmation from './stepConfirmation';

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
    cohortName: "",
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

  handleChangeStudent = isStudent => {
    this.setState({ student: isStudent })
  }

  handleChangeImage = file => {
    this.setState({ image: file })
  }

  handleChangeClasses = (cohortName, classId) => {
    this.setState({
      classId: classId,
      cohortName: cohortName,
    })
  }

  render() {
    const { step } = this.state;
    const { name, username, email, password, image, blurb, available, classId, student, cohortName } = this.state;
    const values = { name, username, email, password, image, blurb, available, classId, student, cohortName };
    switch (step) {
      case 1:
        return <StepOneUserDetails
          nextStep={ this.nextStep }
          handleChange={ this.handleChange }
          values={ values }
        />
      case 2:
        return <StepTwoClassDetails
          { ...this.props }
          state={ this.state }
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          handleChange={ this.handleChange }
          handleChangeStudent={ this.handleChangeStudent }
          handleChangeClasses={ this.handleChangeClasses }
          values={ values }
        />
      case 3:
        return <StepThreeImage
          { ...this.props }
          state={ this.state }
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          handleChange={ this.handleChangeImage }
          values={ values }
        />
      case 4:
        return <StepConfirmation
          { ...this.props }
          state={ this.state }
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          values={ values }
        />
      default:
        break;
    }
  }
}