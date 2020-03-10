import React, { Fragment } from 'react';
import { Input, InputNumber } from 'antd';
import { map, get } from 'lodash';

export default class FormSection extends React.Component {
  render() {
    const { formDescriptions, renderEditItem, id } = this.props;
    return (
      <Fragment>
        {map(formDescriptions, formDescription => {
          switch (get(formDescription, 'inputType')) {
            case 'id':
              return (
                id &&
                renderEditItem(
                  get(formDescription, 'key'),
                  <Input {...get(formDescription, 'inputProps')} />,
                )
              );
            case 'input':
              return renderEditItem(
                get(formDescription, 'key'),
                <Input {...get(formDescription, 'inputProps')} />,
              );
            case 'input_number':
              return renderEditItem(
                get(formDescription, 'key'),
                <InputNumber {...get(formDescription, 'inputProps')} />,
              );
            default:
              return renderEditItem(
                get(formDescription, 'key'),
                <Input {...get(formDescription, 'inputProps')} />,
              );
          }
        })}
      </Fragment>
    );
  }
}
