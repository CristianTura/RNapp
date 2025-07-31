import * as React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from '../navigation/AppNavigator';
import { AudioProvider } from '../utils/AudioContext';
import { PageContext } from '../utils/PageContext';

const App = () => {
  const [isMuted, setIsMuted] = React.useState(false);

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AudioProvider>
        <PageContext.Provider
          value={[
            isMuted,
            setIsMuted,
          ]}>
            <PaperProvider>
              <AppNavigator />
            </PaperProvider>
        </PageContext.Provider>
      </AudioProvider>
    </GestureHandlerRootView>
  );
};

export default App;
