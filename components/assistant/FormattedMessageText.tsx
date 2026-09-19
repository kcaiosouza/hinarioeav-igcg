import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

interface FormattedMessageTextProps {
  content: string;
  isUser?: boolean;
  style?: TextStyle;
  boldStyle?: TextStyle;
}

export const FormattedMessageText: React.FC<FormattedMessageTextProps> = ({
  content,
  isUser = false,
  style,
  boldStyle,
}) => {
  const elements = useMemo(() => {
    if (!content) return null;

    // Split content by **bold** delimiters, capturing delimiter chunks
    const parts = content.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        const text = part.slice(2, -2);
        return (
          <Text
            key={index}
            style={[
              styles.baseBold,
              isUser ? styles.boldUser : styles.boldAgent,
              boldStyle,
            ]}
          >
            {text}
          </Text>
        );
      }
      return part;
    });
  }, [content, isUser, boldStyle]);

  return (
    <Text
      style={[
        styles.baseText,
        isUser ? styles.textUser : styles.textAgent,
        style,
      ]}
    >
      {elements}
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  textUser: {
    fontFamily: THEME_FONTS.sansMedium,
    color: THEME_COLORS.ink,
    fontWeight: '500',
  },
  textAgent: {
    fontFamily: THEME_FONTS.sansRegular,
    color: THEME_COLORS.cream,
  },
  baseBold: {
    fontFamily: THEME_FONTS.sansBold,
    fontWeight: '700',
  },
  boldUser: {
    color: THEME_COLORS.ink,
  },
  boldAgent: {
    color: THEME_COLORS.cream,
  },
});
