import React from 'react';
import ContractsList from '../components/ContractsList';
import { useTenants } from '../../tenants';
import { useRooms } from '../../rooms';

const ContractsPage = () => {
  const { tenants } = useTenants();
  const { rooms } = useRooms();

  return <ContractsList tenants={tenants} rooms={rooms} />;
};

export default ContractsPage;
