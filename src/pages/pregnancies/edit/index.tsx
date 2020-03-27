import React from 'react';
import Form from './components/form';
import styles from './index.less';
import request from '@/utils/request';
import { keyBy, get, reduce, concat } from 'lodash';
import { formDescriptionsFromApi, toApi, fromApi } from './config/adapter';
import { message } from 'antd';

export default class Pregnancies extends React.Component {
  state = {
    data: {},
    formDescriptions: [],
    formDescriptionsWithoutSection: [],
  };

  async componentDidMount() {
    const { location } = this.props;
    const id = get(location, 'query.id');
    const formDescriptions = formDescriptionsFromApi(await request.get('/form-descriptions?moduleName=pregnant'));
    const data = id ? fromApi(await request.get(`/pregnancies/${id}`)) : {};
    let formDescriptionsWithoutSection = reduce(
      formDescriptions,
      (sum, formDescription) => {
        return concat(sum, get(formDescription, 'fields'));
      },
      [],
    );
    formDescriptionsWithoutSection = keyBy(formDescriptionsWithoutSection, 'key');
    this.setState({ formDescriptions, formDescriptionsWithoutSection, data });
  }

  handleSubmit = async values => {
    const { data } = this.state;
    if (get(values, 'id')) {
      await request.put('/pregnancies', { data: toApi({ ...data, ...values }) });
    } else {
      await request.post('/pregnancies', { data: toApi({ ...data, ...values }) });
    }
    message.success('提交成功');
  };

  render() {
    const { formDescriptions, formDescriptionsWithoutSection, data } = this.state;
    return (
      <div className={styles.pregnanciesPanel}>
        <Form
          data={data}
          onFinish={this.handleSubmit}
          formDescriptions={formDescriptions}
          formDescriptionsWithoutSection={formDescriptionsWithoutSection}
        />
      </div>
    );
  }
}
