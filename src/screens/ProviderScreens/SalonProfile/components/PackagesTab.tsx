import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../SalonProfile.styles';
import PackageCard from './PackageCard/PackageCard';
import {Package} from '../../../../types/salon';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface PackagesTabProps {
  packages: Package[];
  selectedPackages: {[key: string]: Package};
  onAddPackage: () => void;
  onTogglePackage: (id: string, pkg: Package) => void;
  onEditPackage: (pkg: Package) => void;
  onDeletePackage: (id: number) => void;
  onContinue: () => void;
}

const PackagesTab: React.FC<PackagesTabProps> = ({
  packages,
  selectedPackages,
  onAddPackage,
  onTogglePackage,
  onEditPackage,
  onDeletePackage,
  onContinue,
}) => {
  const { t, isRTL } = useTranslation();

  return (
    <View style={[styles.servicesContainer, isRTL && { direction: 'rtl' }]}>
      <TouchableOpacity style={styles.AddServiceButton} onPress={onAddPackage}>
        <Text style={styles.AddServiceButtonText}>{t.salonProfile.packages.addNew}</Text>
      </TouchableOpacity>
      {packages?.map(pkg => (
        <PackageCard
          key={pkg.id}
          packageName={pkg.name}
          description={pkg.description}
          duration={pkg.time || t.salonProfile.packages.notAvailable}
          price={pkg.amount}
          isSelected={!!selectedPackages[pkg.id]}
          onAddPress={() => onTogglePackage(pkg.id.toString(), pkg)}
          onEditPress={() => onEditPackage(pkg)}
          onDeletePress={() => onDeletePackage(pkg.id)}
          isRTL={isRTL}
          translations={{
            name: t.salonProfile.packages.packageDetails.name,
            description: t.salonProfile.packages.packageDetails.description,
            duration: t.salonProfile.packages.packageDetails.duration,
            price: t.salonProfile.packages.packageDetails.price,
            add: t.salonProfile.packages.actions.add,
            remove: t.salonProfile.packages.actions.remove,
            edit: t.salonProfile.packages.actions.edit,
            delete: t.salonProfile.packages.actions.delete,
            priceUnit: t.salonProfile.packages.priceUnit
          }}
        />
      ))}
      {Object.values(selectedPackages).length > 0 && (
        <TouchableOpacity 
          style={[styles.continueButton, isRTL && styles.continueButton]} 
          onPress={onContinue}
        >
          <Text style={styles.continueButtonText}>
            {t.salonProfile.packages.actions.continue}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PackagesTab; 