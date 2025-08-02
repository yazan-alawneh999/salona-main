import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './ServiceCard.styles';
import { useTranslation } from '../../contexts/TranslationContext';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    duration: string;
    description?: string;
    price: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  isSelected?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
  onAdd,
  isSelected = false,
}) => {
  // Fetch userType from Redux store
  const userType = useSelector((state: RootState) => state.auth.user?.type);
  const { isRTL, t } = useTranslation();

  return (
    <View style={[styles.cardContainer, isRTL && styles.cardContainerRTL]}>
      {/* Service Info */}
      <View style={[styles.infoContainer, isRTL && styles.infoContainerRTL]}>
        <Text style={[styles.serviceName, isRTL && styles.serviceNameRTL]}>{service.name}</Text>
        <Text style={[styles.duration, isRTL && styles.durationRTL]}>{service.duration} {t.salonProfile.services.mins}</Text>
        {service.description && (
          <Text style={[styles.serviceDescription, isRTL && styles.serviceDescriptionRTL]}>{service.description}</Text>
        )}
      </View>

      {/* Price and Buttons */}
      <View style={[styles.priceAndButton, isRTL && styles.priceAndButtonRTL]}>
        <Text style={[styles.price, isRTL && styles.priceRTL]}>{service.price} JOD</Text>

        {/* Conditional Buttons */}
        {userType === 'salon' ? (
          // Edit and Delete Buttons for Salons
          <>
            {onEdit && (
              <TouchableOpacity
                style={[
                  styles.editButton,
                  isRTL && styles.editButtonRTL,
                  isSelected && styles.editButtonSelected,
                ]}
                onPress={onEdit}
              >
                <Text
                  style={[
                    styles.editButtonText,
                    isRTL && styles.editButtonTextRTL,
                    isSelected && styles.editButtonTextSelected,
                  ]}
                >
                  {t.addServiceModal.edit}
                </Text>
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  isRTL && styles.deleteButtonRTL,
                  isSelected && styles.deleteButtonSelected,
                ]}
                onPress={onDelete}
              >
                <Text
                  style={[
                    styles.deleteButtonText,
                    isRTL && styles.deleteButtonTextRTL,
                    isSelected && styles.deleteButtonTextSelected,
                  ]}
                >
                  {t.addServiceModal.delete}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          // Add/Remove Button for Users
          (onAdd || onDelete) && (
            <TouchableOpacity
              style={[
                styles.addButton,
                isRTL && styles.addButtonRTL,
                isSelected && styles.addButtonSelected,
              ]}
              onPress={isSelected ? onDelete : onAdd}
            >
              <Text
                style={[
                  styles.addButtonText,
                  isRTL && styles.addButtonTextRTL,
                  isSelected && styles.addButtonTextSelected,
                ]}
              >
                {isSelected ? t.salonProfile.services.actions.remove : t.salonProfile.services.actions.add}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default ServiceCard;
