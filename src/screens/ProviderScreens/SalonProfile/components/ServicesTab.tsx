import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../SalonProfile.styles';
import ServiceCard from '../../../../components/ServiceCard/ServiceCard';
import {Service} from '../../../../types/salon';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface ServicesTabProps {
  services: Service[];
  selectedServices: {[key: string]: Service};
  onAddService: () => void;
  onToggleService: (id: string, service: Service) => void;
  onEditService: (service: Service) => void;
  onDeleteService: (id: number) => void;
  onContinue: () => void;
}

const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  selectedServices,
  onAddService,
  onToggleService,
  onEditService,
  onDeleteService,
  onContinue,
}) => {
  const { t, isRTL } = useTranslation();

  return (
    <View style={[styles.servicesContainer]}>
      <TouchableOpacity style={styles.AddServiceButton} onPress={onAddService}>
        <Text style={styles.AddServiceButtonText}>{t.salonProfile.services.addNew}</Text>
      </TouchableOpacity>
      {services?.map(service => (
        <ServiceCard
          key={service.id}
          service={{
            id: service.id.toString(),
            name: service.service,
            description: service.description,
            duration: service.time,
            price: parseFloat(service.price)
          }}
          isSelected={!!selectedServices[service.id]}
          onAdd={() => onToggleService(service.id.toString(), service)}
          onEdit={() => onEditService(service)}
          onDelete={() => onDeleteService(service.id)}
        />
      ))}
      {Object.values(selectedServices).length > 0 && (
        <TouchableOpacity 
          style={[styles.continueButton, isRTL && styles.continueButtonRTL]} 
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>
            {t.salonProfile.services.actions.continue}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ServicesTab; 