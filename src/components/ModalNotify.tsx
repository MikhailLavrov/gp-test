
import React, { createContext } from 'react';
import { Button, Modal, Space } from 'antd';
import { documentsApi } from '../api/documents.js';

const ReachableContext = createContext<string | null>(null);
const DATA_URL = 'https://63e1288bdd7041cafb4281ad.mockapi.io/documents';

const ModalNotify: React.FC = ({selectedDocuments, selectedRowKeys}) => {
  const [modal, contextHolder] = Modal.useModal();
  
  let onAcceptHandle = () => {
    documentsApi.postData(DATA_URL, selectedRowKeys);
  }

  let onModalConfirm = () => {
    modal.confirm({
      title: 'Вы уверены, что хотите аннулировать товар(ы): ',
      okText: 'Применить',
      cancelText: 'Отклонить',
      onOk: onAcceptHandle,
      content: <ReachableContext.Consumer>{(name) => `${name} ?`}</ReachableContext.Consumer>,
    })
  }

  return (
    <ReachableContext.Provider value={selectedDocuments.map(doc => doc.name).join(', ')}>
      <Space>
        <Button onClick={onModalConfirm} disabled={selectedDocuments.length === 0}>Аннулировать</Button>
      </Space>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      {/* <UnreachableContext.Provider value="Bamboo" /> */}
    </ReachableContext.Provider>
  );
};
  
export default ModalNotify;
