import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { THEME_COLORS, THEME_FONTS } from '../../constants/theme';
import { BookKey } from '../../types/hinario';

export interface ActiveBookRowProps {
  activeKey: BookKey;
  bookName: string;
  onRename: (newName: string) => void;
}

export function ActiveBookRow({ activeKey, bookName, onRename }: ActiveBookRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(bookName);

  useEffect(() => {
    if (activeKey !== 'novo') {
      setIsEditing(false);
    }
    setEditValue(bookName);
  }, [activeKey, bookName]);

  const handleCommit = () => {
    const trimmed = editValue.trim() || 'Hinário Novo';
    onRename(trimmed);
    setEditValue(trimmed);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.renameInput}
          value={editValue}
          onChangeText={setEditValue}
          onBlur={handleCommit}
          onSubmitEditing={handleCommit}
          autoFocus
          selectTextOnFocus
          returnKeyType="done"
          accessibilityLabel="Nome do Hinário"
        />
      ) : (
        <>
          <Text style={styles.activeBookName}>{bookName}</Text>
          {activeKey === 'novo' && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Renomear"
              onPress={() => {
                setEditValue(bookName);
                setIsEditing(true);
              }}
              hitSlop={8}
              style={styles.renameBtn}
            >
              <Text style={styles.pencilIcon}>✎</Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 14,
    paddingHorizontal: 4,
    paddingBottom: 6,
    minHeight: 38,
  },
  activeBookName: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 15,
    color: THEME_COLORS.goldSoft,
  },
  renameBtn: {
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pencilIcon: {
    color: THEME_COLORS.muted,
    fontSize: 14,
  },
  renameInput: {
    fontFamily: THEME_FONTS.fraunces.semiBold,
    fontSize: 15,
    backgroundColor: THEME_COLORS.surface,
    color: THEME_COLORS.cream,
    borderWidth: 1,
    borderColor: THEME_COLORS.gold,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    width: 170,
  },
});
