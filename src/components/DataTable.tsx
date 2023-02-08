import React, { useState, useEffect, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import store from '../redux/store';
import { setData } from '../redux/documentsReducer.tsx';
import { Typography } from 'antd';
import ModalNotify from './ModalNotify.tsx';

const { Text } = Typography;

interface DataType {
  key: number;
  id: string;
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
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const [documents, setDocuments] = useState(store.getState().documents)
  
  let selectedDocuments = useMemo(() => {
    return selectedRowKeys.map(i => documents[i - 1]);
  }, [selectedRowKeys, documents]);

  // console.log(selectedDocuments);
  
  useEffect(() => {
    fetch('https://63e1288bdd7041cafb4281ad.mockapi.io/documents')
    .then(Response => Response.ok ? Response.json() : console.log(`Response.status: ${Response.status}`))
    .then(data => {
      const filteredData = data.filter(document => document.currency === 'USD' || document.currency === 'RUB');
      store.dispatch(setData(filteredData))
      setDocuments(filteredData)
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
                  <ModalNotify selectedDocuments={selectedDocuments}/>
                </>
              );
            }}
          />
        </>;
}

export default DataTable;
