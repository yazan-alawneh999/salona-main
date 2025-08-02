import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '../../contexts/TranslationContext';
interface TagSelectionSectionProps {
  title: string;
  tags: { label: string; icon?: string }[]; // Each tag can optionally include an icon
  onSelectionChange?: (selectedTags: string[]) => void;
  singleSelect?: boolean;
}

const TagSelectionSection: React.FC<TagSelectionSectionProps> = ({
  title,
  tags,
  onSelectionChange,
  singleSelect = false,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { isRTL } = useTranslation();
  const handleTagPress = (tag: string) => {
    let newSelectedTags: string[];
    
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      // Add tag if not already selected
      if (singleSelect) {
        newSelectedTags = [tag];
      } else {
        newSelectedTags = [...selectedTags, tag];
      }
    }
    
    setSelectedTags(newSelectedTags);
    onSelectionChange?.(newSelectedTags);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.title, { textAlign: isRTL ? 'left' : 'right' }]}>{title}</Text>

      <View style={[styles.tagContainer, { flexDirection: isRTL ? 'row' : 'row-reverse' }]}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags.includes(tag.label) && styles.selectedTag,
            ]}
            onPress={() => handleTagPress(tag.label)}>
            {tag.icon && (
              <Icon
                name={tag.icon}
                size={16}
                color={
                  selectedTags.includes(tag.label)
                    ? Colors.black
                    : Colors.gold
                }
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag.label) && styles.selectedTagText,
              ]}>
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    
  },
  title: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Maitree-SemiBold',
    marginBottom: 10,
    textAlign: 'right',
  },
  tagContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 16,
  },
  tag: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5, // Add some space between the icon and text
  },
  tagText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
  },
  selectedTag: {
    backgroundColor: Colors.gold,
  },
  selectedTagText: {
    color: Colors.black,
    fontFamily: 'Maitree-Medium',
  },
});

export default TagSelectionSection;
