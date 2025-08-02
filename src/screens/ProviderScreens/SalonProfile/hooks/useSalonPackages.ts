import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Package, CreatePackage, UpdatePackage} from '../../../../types/salon';
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useUpdatePackageMutation,
} from '../../../../redux/api/salonApi';
import {updateSalon} from '../../../../redux/slices/salonSlice';

export const useSalonPackages = (salonId: number, salonData: any) => {
  const dispatch = useDispatch();
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: Package}>({});
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();
  const [addPackage] = useCreatePackageMutation();

  const handleEditPackage = async (packageId: number, data: {
    name: string;
    description: string;
    amount: string;
    services: string;
    time: string;
  }) => {
    try {
      if (!salonId) {
        console.error('Salon ID is undefined');
        return;
      }

      // Validate required fields
      if (!data.name || !data.description || !data.amount || !data.services || !data.time) {
        throw new Error('All fields are required');
      }

      // Ensure services is a valid JSON string
      let servicesJson;
      try {
        servicesJson = JSON.stringify(JSON.parse(data.services));
      } catch (e) {
        throw new Error('Services must be a valid JSON string');
      }

      const updateData: UpdatePackage = {
        name: data.name,
        description: data.description,
        amount: parseFloat(data.amount),
        services: servicesJson,
        time: data.time,
      };

      await updatePackage({
        salonId,
        packageId,
        package: updateData,
      }).unwrap();

      return true;
    } catch (error) {
      console.error('Failed to update package:', error);
      throw error;
    }
  };

  const handleDeletePackage = async (packageId: number) => {
    try {
      if (!salonId) {
        console.error('Salon ID is undefined');
        return;
      }

      await deletePackage({
        salonId,
        packageId,
      }).unwrap();

      return true;
    } catch (error) {
      console.error('Failed to delete package:', error);
      throw error;
    }
  };

  const handleAddPackage = async (data: {
    name: string;
    description: string;
    amount: string;
    services: string;
    time: string;
  }) => {
    try {
      if (!salonId) {
        console.error('Salon ID is undefined');
        return;
      }

      const newPackage: CreatePackage = {
        salon_id: salonId,
        name: data.name,
        description: data.description,
        amount: parseFloat(data.amount),
        services: data.services,
        time: data.time,
      };

      await addPackage(newPackage).unwrap();

      return true;
    } catch (error) {
      console.error('Failed to add package:', error);
      throw error;
    }
  };

  const togglePackage = (id: string, pkg: Package) => {
    setSelectedPackages(prevState => {
      if (prevState[id]) {
        const updatedState = {...prevState};
        delete updatedState[id];
        return updatedState;
      }
      return {...prevState, [id]: pkg};
    });
  };

  return {
    selectedPackages,
    handleEditPackage,
    handleDeletePackage,
    handleAddPackage,
    togglePackage,
  };
}; 