import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children, style, backgroundColor = '#ffffff' }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
        translucent={true}
      />
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: backgroundColor,
            paddingTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default SafeAreaWrapper; 