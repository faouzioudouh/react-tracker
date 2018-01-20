import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectBlock from './SelectBlock';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

const props = {
  id: 'selectId',
  label: 'this is label',
  options: [
    {
      value: 'Female',
      text: 'Female',
    },
    {
      value: 'Male',
      text: 'Male',
    }
  ]
};

describe('SelectBlock', () => {
  it('should render different element of the component', () => {
    const component = shallow(<SelectBlock {...props} />);

    // Label
    const Label = component.find('label');
    expect(Label).to.be.present();
    expect(Label.props().htmlFor).to.equal('selectId');

    // Select
    const Select = component.find('select');
    expect(Select).to.be.present();
    expect(Select.props().id).to.equal('selectId');

    // Options
    const Options = component.find('option');
    expect(Options).to.length(2);
    expect(Options.at(0).props().value).to.equal(props.options[0].value);
    expect(Options.at(1).props().value).to.equal(props.options[1].value);
    expect(Options.at(0).props().children).to.equal(props.options[0].text);
    expect(Options.at(1).props().children).to.equal(props.options[1].text);
  });

  it('should render asterisk if the select is required', () => {
    const propsWithRequired = Object.assign({}, props, { required: true });

    const component = shallow(<SelectBlock {...propsWithRequired} />);

    expect(component.find('span[aria-hidden=true]')).to.not.be.present();
  });

  it('Should render nothing is no option provided', () => {
    const propsWithoutOptions = Object.assign({}, props, { options: [] });

    const component = shallow(<SelectBlock {...propsWithoutOptions} />);
    expect(component.find('.SelectBlock')).to.not.be.present();    
  });
});

chai.use(chaiEnzyme());