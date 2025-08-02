import {useState} from 'react';
import {Service, CreateService} from '../../../../types/salon';
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '../../../../redux/api/salonApi';

export const useSalonServices = (salonId: number, salonData: any) => {
  const [selectedServices, setSelectedServices] = useState<{[key: string]: Service}>({});
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [addService] = useCreateServiceMutation();

  const handleEditService = async (serviceId: number, data: {
    name: string;
    description: string;
    cost: string;
    time: string;
  }) => {
    try {
      if (!salonData?.salons) {
        console.error('Salon data is not available');
        return;
      }

      const response = await updateService({
        salonId,
        services: [
          {
            id: serviceId,
            service: data.name,
            price: parseFloat(data.cost),
            description: data.description,
            time: data.time,
          },
        ],
      }).unwrap();

      return response;
    } catch (error) {
      console.error('Failed to update service:', error);
      throw error;
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    try {
      if (!salonId || !salonData?.salons) {
        console.error('Salon ID or data is undefined');
        return;
      }

      const response = await deleteService({salonId, serviceId}).unwrap();
      return response;
    } catch (error) {
      console.error('Failed to delete service:', error);
      throw error;
    }
  };

  const handleAddService = async (data: {
    name: string;
    description: string;
    cost: string;
    time: string;
  }) => {
    try {
      if (!salonId || !salonData?.salons) {
        console.error('Salon ID or data is undefined');
        return;
      }

      const newService: CreateService = {
        service: data.name,
        price: parseFloat(data.cost),
        description: data.description,
        time: data.time,
      };

      const response = await addService({
        salonId,
        services: [newService],
      }).unwrap();

      return response;
    } catch (error) {
      console.error('Failed to add service:', error);
      throw error;
    }
  };

  const toggleService = (id: string, service: Service) => {
    setSelectedServices(prevState => {
      if (prevState[id]) {
        const updatedState = {...prevState};
        delete updatedState[id];
        return updatedState;
      }
      return {...prevState, [id]: service};
    });
  };

  return {
    selectedServices,
    handleEditService,
    handleDeleteService,
    handleAddService,
    toggleService,
  };
}; 