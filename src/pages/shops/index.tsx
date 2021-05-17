import type { FunctionComponent } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { Shop } from '@/models/shop';
import { useTableRequest } from '@/hooks/table/table-requst';
import { useShopList } from './hooks';
import { ShopServices } from '@/services/shop';

const ShopsPage: FunctionComponent = () => {
  const [request] = useTableRequest<Shop>(ShopServices.getShopPageList);
  const [{ tableActionRef }, { openModal }] = useShopList();

  const columns: ProColumnType<Shop>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
    },
    {
      title: '店铺名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '店铺地址',
      dataIndex: 'address',
      align: 'center',
    },
    {
      title: '店铺介绍',
      dataIndex: 'description',
      align: 'center',
      search: false,
    },
    {
      title: '操作',
      align: 'center',
      search: false,
      render: () => [],
    },
  ];

  return (
    <PageContainer
      extra={[
        <Button key="add" type="primary" onClick={() => openModal()}>
          新增店铺
        </Button>,
      ]}
    >
      <ProTable<Shop> actionRef={tableActionRef} columns={columns} rowKey="id" request={request} />
    </PageContainer>
  );
};

export default ShopsPage;
