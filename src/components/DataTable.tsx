import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import store from '../redux/store';
import { setData } from '../redux/documentsReducer.tsx';
import { Typography } from 'antd';

const { Text } = Typography;

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
    fetch('https://63e1288bdd7041cafb4281ad.mockapi.io/documents')
    .then(Response => Response.ok ? Response.json() : console.log(`Response.status: ${Response.status}`))
    .then(data => {
      store.dispatch(setData(data))
      setDocuments(data)
    })
    .catch(error => console.error(`Fetching data error: ${error}`))
  }, []);

  return <>
          <Table
            columns={columns}
            dataSource={documents}
            pagination={false}
            rowSelection={rowSelection}
            bordered
            summary={(pageData) => {
              let totalQuantity = 0;
              let totalPrice = 0;

              pageData.forEach(({ quantity, price }) => {
                totalQuantity += quantity;
                totalPrice += price;
              });

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>Итого</Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={1}>
                      <Text type="danger">{totalQuantity}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} colSpan={1} />
                    <Table.Summary.Cell index={3} colSpan={1}>
                      <Text type="danger">{totalPrice}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
          </>;
}

export default DataTable;
