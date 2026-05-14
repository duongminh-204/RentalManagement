import React from 'react';
import VehiclesList from '../components/VehiclesList';
import { useTenants } from '../../tenants';
import { useRooms } from '../../rooms';

const VehiclesPage = () => {
  const { tenants } = useTenants();
  const { rooms } = useRooms();

  return <VehiclesList tenants={tenants} rooms={rooms} />;
};

export default VehiclesPage;
