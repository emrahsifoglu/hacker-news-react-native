/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {useSelector, useDispatch} from 'react-redux';
import {ApplicationState, onFetchNews} from './src/store';
import {Button} from './src/components/Button';
import {toLocaleDateString} from './src/helpers';

const Section: React.FC<{
  title: string;
  url: string;
}> = ({children, title, url}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <View>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
      <View style={styles.alignRight}>
        {url && (
          <Text style={styles.openURL} onPress={() => Linking.openURL(url)}>
            Read more...
          </Text>
        )}
      </View>
    </View>
  );
};

const AppNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const dispatch = useDispatch();
  const {news, isLoading, error} = useSelector(
    (state: ApplicationState) => state.newsReducer,
  );

  const onRefreshNews = () => {
    dispatch(onFetchNews());
  };

  useEffect(() => {
    dispatch(onFetchNews());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.sectionDefault}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.sectionDefault}>
        <Text style={styles.sectionError}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title="Refresh" onTap={onRefreshNews} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {news.map(userStory => (
            <Section
              key={userStory.story.id}
              title={userStory.story.title}
              url={userStory.story.url}>
              <Text style={styles.highlight}>
                By {userStory.author.id} on{' '}
                {toLocaleDateString(userStory.story.time)}
                {'\n'}
              </Text>
              <Text style={styles.sectionContent}>
                {'\n'}
                Score is {userStory.story.score}
                {'\n'}
              </Text>
              <Text style={styles.sectionContent}>
                Author's karma is {userStory.author.karma}
              </Text>
            </Section>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionError: {
    fontSize: 18,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionContent: {
    fontSize: 16,
    fontWeight: '400',
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  highlight: {
    fontWeight: '700',
  },
  sectionDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openURL: {
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
