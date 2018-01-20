import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './AddFriendForm.css';

import SelectBlock from './SelectBlock';

const selectOptions = [
  {
    text: '-- Select --',
    value: '',
    defaultValue: true
  },
  {
    value: 'Female',
    text: 'Female',
  },
  {
    value: 'Male',
    text: 'Male',    
  }
];

const selectProps = {
  label: 'Select your gender',
  options: selectOptions
}

class AddFriendForm extends Component {

  render () {
    return (
      <form className="AddFriendForm__wrapper"
        ref={this.handleFormRef}>

        <div className="form-group">
          <input
            type="text"
            autoFocus="true"
            className={classnames('form-control', styles.AddFriendForm)}
            placeholder="Type the name of a friend"
            value={this.state.name}
            name="name"
            onChange={this.handleChange.bind(this)} />
        </div>

        <div className="form-group">
          <SelectBlock {...selectProps} id="selectGender" required/>
        </div>
        
        <div className="AddFriendForm__button-wrapper form-group">
          <button
            onClick={this.handleSubmit}
            className="btn btn-primary"> Add friend</button>
        </div>
      </form>
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender:  this.props.gender || '',
    };

    this.handleGenderSelect = this.handleGenderSelect.bind(this);
    this.handleFormRef = this.handleFormRef.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Add change handler to props of SelectBlock
    Object.assign(selectProps, {
      onChange: this.handleGenderSelect
    })
  }

  /**
   * handle input change
   * @param {Event} e 
   */
  handleChange (e) {
    this.setState({ name: e.target.value });
  }

  /**
   * handle gender select
   * @param {Event} e 
   */
  handleGenderSelect (e) {
    this.setState({ gender: e.target.value });
  }

  /**
   * handle Form Ref
   * @param {DOMEelemnt} ref 
   */
  handleFormRef(ref) {
    this.formRef = ref;
  }

  /**
   * Handle form submit
   * @param {Event} e 
   */
  handleSubmit (e) {
    e.preventDefault();
    if (this.state.name && this.state.gender) {     
      this.props.addFriend(this.state.name, this.state.gender);
      this.setState({ name: '', gender: '' });

      // Rest form fields
      this.formRef.reset();

      //Focus on the name input
      this.formRef.elements.name.focus();      
    }
  }

}

AddFriendForm.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendForm
