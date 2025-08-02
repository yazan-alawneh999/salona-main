import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import styles from './SearchBarWithMenu.styles';
import { useTranslation } from '../../contexts/TranslationContext';

interface SearchBarWithMenuProps {
  onSearchChange: (text: string) => void;
  onSearchSubmit?: () => void;
  onMenuPress: () => void;
  value?: string;
}

const SearchBarWithMenu: React.FC<SearchBarWithMenuProps> = ({
  onSearchChange,
  onSearchSubmit,
  onMenuPress,
  value,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputWrapper}>
        <Icon name="search" size={20} color={Colors.white} />
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchBarWithMenu.placeholder} 
          placeholderTextColor={Colors.white}
          onChangeText={onSearchChange}
          value={value}
          onSubmitEditing={onSearchSubmit}
          returnKeyType="search"
        />
      </View>
      {/* <TouchableOpacity style={styles.menuIconWrapper} onPress={onMenuPress}>
        <Icon name="menu" size={24} color={Colors.gold} />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchBarWithMenu;
