// export const data = {
//   nodes: [
//     {
//       id: 'root',
//       label: '前端技能树',
//     },
//     {
//       id: 'basic',
//       label: '基础',
//     },
//     {
//       id: 'frame',
//       label: '框架',
//     },
//     {
//       id: 'backend',
//       label: '服务端',
//     },
//   ],
//   edges: [
//     {
//       source: 'root',
//       target: 'basic',
//       // data: {
//       //   type: 'name1',
//       //   amount: '100,000,000,00 元',
//       //   date: '2019-08-03',
//       // },
//     },
//     {
//       source: 'root',
//       target: 'frame',
//     },
//     {
//       source: 'root',
//       target: 'backend',
//     },
//   ],
// };

export const data = {
  id: 'root',
  label: '前端技能树',
  children: [
    {
      id: 'basic',
      label: '基础技能',
      children: [
        {
          id: 'vue',
          label: 'vue',
        },
        {
          id: 'react',
          label: 'react',
        },
        {
          id: 'angular',
          label: 'angular',
        },
      ],
    },
    {
      id: 'frame',
      label: '框架',
    },
    {
      id: 'backend',
      label: '服务端',
    },
  ],
};
