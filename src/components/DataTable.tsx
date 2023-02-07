import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { Spin } from 'antd';
import store from '../redux/store';
import { setData, toggleIsFetching } from '../redux/documentsReducer.tsx';

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

  const [documents, setDocuments] = useState(store.getState().documents)
  useEffect(() => {
    store.dispatch(toggleIsFetching(true))
    fetch('https://63e1288bdd7041cafb4281ad.mockapi.io/documents/documents')
    .then(Response => Response.ok ? Response.json() : console.log(`Response.status: ${Response.status}`))
    .then(data => {
      store.dispatch(setData(data))
      setDocuments(data)
    })
    .catch(error => console.error(`Fetching data error: ${error}`))
    .finally(() => store.dispatch(toggleIsFetching(false)))
  }, []);

  return <>
          {store.getState().isFetching === true ? 
          <Spin size='large' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}} /> :
          <Table rowSelection={rowSelection} columns={columns} dataSource={documents} />}
        </>
  ;
}

export default DataTable;