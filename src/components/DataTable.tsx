import React, { useState, useEffect, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Typography } from 'antd';
import ModalNotify from './ModalNotify.tsx';

const DATA_URL = 'https://63e1288bdd7041cafb4281ad.mockapi.io/documents';

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
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Количество',
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Дата доставки',
    dataIndex: 'deliveryDate',
    sorter: (a, b) => a.deliveryDate.localeCompare(b.deliveryDate),
    sortOrder: 'ascend',
  },
  {
    title: 'Стоимость',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Валюта',
    dataIndex: 'currency',
    sorter: (a, b) => a.currency.localeCompare(b.currency),
  },
]

const DataTable: React.FC = (props) => {
  const { documents, setData } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => { setSelectedRowKeys(newSelectedRowKeys) }
  const rowSelection = { selectedRowKeys, onChange: onSelectChange }
  
  let selectedDocuments = useMemo(() => {
    return selectedRowKeys.map(i => documents[i - 1]);
  }, [selectedRowKeys, documents]);
  
  useEffect(() => {
    fetch(DATA_URL)
    .then(Response => Response.ok ? Response.json() : console.log(`Response.status: ${Response.status}`))
    .then(data => {
      // const filteredData = data.filter(doc => doc.currency === 'USD' || doc.currency === 'RUB');
      setData(data)
    })
    .catch(error => console.error(`Fetching data error: ${error}`))
  }, [setData]);

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
                  <Table.Summary.Cell index={0} colSpan={2}>Общее количество:</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={1}>
                    <Text type="danger">{totalQuantity}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} colSpan={1} />
                  <Table.Summary.Cell index={3} colSpan={1}>
                    <Text type="danger">{totalPrice}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
                <ModalNotify selectedDocuments={selectedDocuments} selectedRowKeys={selectedRowKeys}/>
              </>
            );
            }}
          />
        </>;
}

export default DataTable;
