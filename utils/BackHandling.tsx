import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export const useBackHandler = (handleNav?: () => void) => {
  const navigation:any = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true; // Disable back ONLY on this screen
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      const timer = setTimeout(() => {
        if (handleNav) handleNav();
        else navigation.navigate('HomeBlank');
      }, 7000);

      return () => {
        subscription.remove(); // restore back btn
        clearTimeout(timer);
      };
    }, [handleNav, navigation])
  );
};
