import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';

interface FormattedMessageTextProps {
  content: string;
  isUser?: boolean;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  boldStyle?: TextStyle;
}

interface MarkdownBlock {
  type: 'heading' | 'paragraph';
  level?: number;
  text: string;
}

export const FormattedMessageText: React.FC<FormattedMessageTextProps> = ({
  content,
  isUser = false,
  style,
  containerStyle,
  boldStyle,
}) => {
  const blocks = useMemo(() => {
    if (!content) return [];
    const rawLines = content.split('\n');
    const result: MarkdownBlock[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        result.push({ type: 'paragraph', text: currentParagraph.join('\n') });
        currentParagraph = [];
      }
    };

    for (const line of rawLines) {
      // Check for Markdown headings #, ##, ###, ####
      const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
      if (headingMatch) {
        flushParagraph();
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        result.push({ type: 'heading', level, text });
      } else if (line.trim() === '') {
        flushParagraph();
      } else {
        currentParagraph.push(line);
      }
    }
    flushParagraph();
    return result;
  }, [content]);

  const renderInlineBold = (text: string) => {
    // Split content by **bold** delimiters, capturing delimiter chunks
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        const boldText = part.slice(2, -2);
        return (
          <Text
            key={index}
            style={[
              styles.baseBold,
              isUser ? styles.boldUser : styles.boldAgent,
              boldStyle,
            ]}
          >
            {boldText}
          </Text>
        );
      }
      return part;
    });
  };

  if (blocks.length === 0) {
    return null;
  }

  // Single paragraph optimization: return simple inline text without View container
  if (blocks.length === 1 && blocks[0].type === 'paragraph') {
    return (
      <Text
        style={[
          styles.baseText,
          isUser ? styles.textUser : styles.textAgent,
          style,
        ]}
      >
        {renderInlineBold(blocks[0].text)}
      </Text>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {blocks.map((block, index) => {
        const isFirst = index === 0;
        const isLast = index === blocks.length - 1;

        if (block.type === 'heading') {
          const headingStyle =
            block.level === 1
              ? styles.h1
              : block.level === 2
              ? styles.h2
              : block.level === 3
              ? styles.h3
              : styles.h4;

          const headingColor = isUser
            ? styles.textUser
            : block.level! <= 2
            ? styles.headingAgentPrimary
            : styles.headingAgentSecondary;

          return (
            <Text
              key={index}
              style={[
                styles.baseHeading,
                headingStyle,
                headingColor,
                isFirst && styles.firstBlock,
                isLast && styles.lastBlock,
                style,
              ]}
            >
              {renderInlineBold(block.text)}
            </Text>
          );
        }

        return (
          <Text
            key={index}
            style={[
              styles.baseText,
              styles.paragraph,
              isUser ? styles.textUser : styles.textAgent,
              isFirst && styles.firstBlock,
              isLast && styles.lastBlock,
              style,
            ]}
          >
            {renderInlineBold(block.text)}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  baseText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  paragraph: {
    marginBottom: 8,
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
  baseHeading: {
    letterSpacing: -0.2,
  },
  h1: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: THEME_FONTS.sansBold,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
  },
  h2: {
    fontSize: 16.5,
    lineHeight: 22,
    fontFamily: THEME_FONTS.sansBold,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  h3: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: THEME_FONTS.sansSemiBold,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 3,
  },
  h4: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: THEME_FONTS.sansSemiBold,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 2,
  },
  headingAgentPrimary: {
    color: THEME_COLORS.cream,
  },
  headingAgentSecondary: {
    color: THEME_COLORS.goldSoft,
  },
  firstBlock: {
    marginTop: 0,
  },
  lastBlock: {
    marginBottom: 0,
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
