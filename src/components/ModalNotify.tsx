
import React, { createContext } from 'react';
import { Button, Modal, Space } from 'antd';

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

let goods = (arr) => {
  return arr.join(', ')
}

const config = {
  title: 'Вы уверены, что хотите аннулировать товар(ы): ' + goods(['1', '2']),
  content: (
    <>
      <ReachableContext.Consumer>{(name) => `Reachable: ${name}!`}</ReachableContext.Consumer>
      <br />
      <UnreachableContext.Consumer>{(name) => `Unreachable: ${name}!`}</UnreachableContext.Consumer>
    </>
  ),
};

const ModalNotify: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button onClick={ () => modal.confirm(config) }>Аннулировать</Button>
      </Space>
      {/* `contextHolder` should always be placed under the context you want to access */}
      {contextHolder}

      {/* Can not access this context since `contextHolder` is not in it */}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};
  
export default ModalNotify;
