export default {
  columns: [
    {
      title: '孕次',
      dataIndex: 'index',
      key: 'index',
      renderConfig: {
        inputType: 'view',
      },
    },
    {
      title: '年-月',
      dataIndex: 'pregnancyEnd',
      key: 'pregnancyEnd',
      renderConfig: {
        inputType: 'pregnancyEnd',
      },
    },
    {
      title: '流产',
      children: [
        {
          title: '自然',
          key: 'naturalAbortion',
          dataIndex: 'naturalAbortion',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
        {
          title: '清宫',
          key: 'currettage',
          dataIndex: 'currettage',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
        {
          title: '药物',
          key: 'medicalAbortion',
          dataIndex: 'medicalAbortion',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
        {
          title: '手术',
          key: 'surgicalAbortion',
          dataIndex: 'surgicalAbortion',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
        // {
        //   title: '流产备注',
        //   key: 'abortionNote',
        //   dataIndex: 'abortionNote',
        //   width: 80,
        //   renderConfig: {
        //     inputType: 'input',
        //   },
        // },
      ],
    },
    {
      title: '引产',
      key: 'inducedLabor',
      dataIndex: 'inducedLabor',
      renderConfig: {
        inputType: 'checkbox',
      },
    },
    {
      title: '死胎',
      key: 'fetusdeath',
      dataIndex: 'fetusdeath',
      renderConfig: {
        inputType: 'checkbox',
      },
    },
    // {
    //   title: '早产',
    //   key: 'prematureDelivery',
    //   dataIndex: 'prematureDelivery',
    //   renderConfig: {
    //     inputType: 'checkbox',
    //   },
    // },
    {
      title: '足月产',
      key: 'term',
      dataIndex: 'term',
      renderConfig: {
        inputType: 'checkbox',
      },
    },
    {
      title: '分娩方式',
      children: [
        {
          title: '顺产',
          key: 'vaginalDelivery',
          dataIndex: 'vaginalDelivery',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
        {
          title: '手术产',
          key: 'deliverWay',
          dataIndex: 'deliverWay',
          width: 80,
          renderConfig: {
            inputType: 'deliverWay',
            inputProps: { allowClear: true },
            special_config: `{"type":"array","mode":"single","options":[{"value":"cesareanSection","label":"剖宫产"},{"value":"forceps","label":"钳产"},{"value":"vacuumAssisted","label":"吸引产"},{"value":"breechMidwifery","label":"臀助产"}]}`,
          },
        },
      ],
    },
    {
      title: '产后情况',
      children: [
        {
          title: '出血',
          key: 'hemorrhage',
          dataIndex: 'hemorrhage',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
        {
          title: '产褥热',
          key: 'puerperalFever',
          dataIndex: 'puerperalFever',
          renderConfig: {
            inputType: 'checkbox',
          },
        },
      ],
    },
    {
      title: '胎数',
      key: 'fetalcount',
      dataIndex: 'fetalcount',
      width: 60,
      renderConfig: {
        inputType: 'fetalcount',
      },
    },
    {
      title: '小孩情况',
      children: [
        {
          title: '性别',
          key: 'childGender',
          dataIndex: 'childGender',
          width: 60,
          renderConfig: {
            inputType: 'normal_select',
            typeMapping: 'genderMapping',
            isChildCol: true,
            inputProps: { allowClear: true },
          },
        },
        {
          title: '死亡',
          key: 'childDeath',
          dataIndex: 'childDeath',
          width: 60,
          renderConfig: {
            inputType: 'checkbox',
            isChildCol: true,
          },
        },
        // {
        //   title: '死亡时间',
        //   key: 'fetalcount',
        //   dataIndex: 'fetalcount',
        //   width: 60,
        //   render: (value: any, rowData: any, index: number) => {
        //     const children = <Input size="small" defaultValue={value} />;
        //     return renderContent(children, {});
        //   },
        // },
        {
          title: '死亡原因',
          key: 'childDeathNote',
          dataIndex: 'childDeathNote',
          width: 100,
          renderConfig: {
            inputType: 'input',
            isChildCol: true,
          },
        },
        {
          title: '后遗症',
          key: 'sequela',
          dataIndex: 'sequela',
          width: 60,
          renderConfig: {
            inputType: 'checkbox',
            isChildCol: true,
          },
        },
        {
          title: '出生体重(kg)',
          key: 'neonateWeight',
          dataIndex: 'neonateWeight',
          width: 60,
          renderConfig: {
            inputType: 'input_number',
            inputProps: { min: 0 },
            isChildCol: true,
          },
        },
      ],
    },
    {
      title: '分娩医院',
      key: 'hospital',
      dataIndex: 'hospital',
      width: 100,
      renderConfig: {
        inputType: 'input',
      },
    },
    {
      title: '特殊情况',
      key: 'exceptionalcase',
      dataIndex: 'exceptionalcase',
      width: 100,
      renderConfig: {
        inputType: 'input',
      },
    },
  ],
  apiField: {
    index: {
      key: 'index',
      type: 'none',
    },
    pregnancyEnd: {
      key: 'pregnancyEnd',
      type: 'pregnancyEnd',
      path: ['year', 'month'],
    },
    naturalAbortion: {
      key: 'naturalAbortion',
      type: 'normal',
      path: 'naturalAbortion',
    },
    currettage: {
      key: 'currettage',
      type: 'normal',
      path: 'currettage',
    },
    medicalAbortion: {
      key: 'medicalAbortion',
      type: 'normal',
      path: 'medicalAbortion',
    },
    surgicalAbortion: {
      key: 'surgicalAbortion',
      type: 'normal',
      path: 'surgicalAbortion',
    },
    inducedLabor: {
      key: 'inducedLabor',
      type: 'normal',
      path: 'inducedLabor',
    },
    // abortionNote: {
    //   key: 'abortionNote',
    //   type: 'normal',
    //   path: 'abortionNote',
    // },
    fetusdeath: {
      key: 'fetusdeath',
      type: 'normal',
      path: 'fetusdeath',
    },
    term: {
      key: 'term',
      type: 'normal',
      path: 'term',
    },
    vaginalDelivery: {
      key: 'vaginalDelivery',
      type: 'normal',
      path: 'vaginalDelivery',
    },
    deliverWay: {
      key: 'deliverWay',
      type: 'select',
      options: ['cesareanSection', 'forceps', 'vacuumAssisted', 'breechMidwifery'],
    },
    hemorrhage: {
      key: 'hemorrhage',
      type: 'normal',
      path: 'hemorrhage',
    },
    puerperalFever: {
      key: 'puerperalFever',
      type: 'normal',
      path: 'puerperalFever',
    },
    fetalcount: {
      key: 'fetalcount',
      type: 'normal',
      path: 'fetalcount',
    },
    hospital: {
      key: 'hospital',
      type: 'normal',
      path: 'hospital',
    },
    exceptionalcase: {
      key: 'exceptionalcase',
      type: 'normal',
      path: 'exceptionalcase',
    },
    id: {
      key: 'id',
      type: 'children',
      path: 'children.id',
    },
    childGender: {
      key: 'childGender',
      type: 'children',
      path: 'children.childGender',
    },
    childDeath: {
      key: 'childDeath',
      type: 'children',
      path: 'children.childDeath',
    },
    childDeathNote: {
      key: 'childDeathNote',
      type: 'children',
      path: 'children.childDeathNote',
    },
    sequela: {
      key: 'sequela',
      type: 'children',
      path: 'children.sequela',
    },
    neonateWeight: {
      key: 'neonateWeight',
      type: 'children',
      path: 'children.neonateWeight',
    },
  },
};
