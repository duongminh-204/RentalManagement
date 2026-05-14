import React from 'react';
import RoomFormComponent from '../../../components/forms/RoomFormComponent';

const RoomForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel, 
  loading = false,
  error = null 
}) => {
  return (
    <RoomFormComponent
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      loading={loading}
      error={error}
    />
  );
};

export default RoomForm;