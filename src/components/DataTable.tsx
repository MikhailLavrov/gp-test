import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { setData } from '../redux/docsReducer.tsx';
import { useDispatch } from 'react-redux';
import store from '../redux/store';

interface DataType {
  key: number;
  name: string;
  quantity: number;
  deliveryDate: string;
  price: number;
  currency: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
  },
  {
    title: 'Дата доставки',
    dataIndex: 'deliveryDate',
  },
  {
    title: 'Стоимость',
    dataIndex: 'price',
  },
  {
    title: 'Валюта',
    dataIndex: 'currency',
  },
]

const DataTable: React.FC = () => {
  // let state = store.getState();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://63e1288bdd7041cafb4281ad.mockapi.io/documents/documents')
    .then( ((Response) => Response.json()))
    .then(data => dispatch(setData(data)))
  });
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return <Table rowSelection={rowSelection} columns={columns} dataSource={store.getState().documents.data} />;
}

export default DataTable;