import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Rive, { Alignment, RiveRef } from 'rive-react-native';

interface Users {
  id: string;
  createdAt: Date;
  name: string;
  avatar: string;
  password: string;
  username: string;
}

const resourceName = 'teddy_login';
const App = () => {
  const riveRef = React.useRef<RiveRef>(null);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handsUp = () =>
    riveRef.current?.setInputState('State Machine 1', 'hands_up', true);

  const handsDown = () =>
    riveRef.current?.setInputState('State Machine 1', 'hands_up', false);

  const wrongPassword = () =>
    riveRef.current?.fireState('State Machine 1', 'fail');
  const success = () =>
    riveRef.current?.fireState('State Machine 1', 'success');

  const lookDown = () =>
    riveRef.current?.setInputState('State Machine 1', 'Check', true);
  riveRef.current?.setInputState(
    'State Machine 1',
    'Look',
    username.length * 2,
  );

  const lookUp = () =>
    riveRef.current?.setInputState('State Machine 1', 'Check', false);

  const authenticateUser = async () => {
    const response: Response = await fetch(
      'https://60d4631361160900173cb0d9.mockapi.io/users',
    );
    const users: Users[] = await response.json();
    const validUser = users.find(
      user => username === user.username && password === user.password,
    );
    console.log(validUser);
    if (validUser) {
      success();
    } else {
      wrongPassword();
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Rive
          resourceName={resourceName}
          autoplay
          stateMachineName={'State Machine 1'}
          alignment={Alignment.TopCenter}
          ref={riveRef}
          style={styles.rive}
        />
        <TextInput
          autoCorrect
          placeholder="User Name"
          onChangeText={setUsername}
          onFocus={lookDown}
          onBlur={lookUp}
          value={username}
          style={styles.input}
        />
        <TextInput
          autoCorrect
          placeholder="Password"
          onChangeText={setPassword}
          onFocus={handsUp}
          onBlur={handsDown}
          value={password}
          autoCompleteType="password"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={authenticateUser}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  rive: {
    width: 250,
    height: 250,
    flexGrow: 0,
  },
  input: {
    backgroundColor: '#fff',
    width: 250,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 20,
    borderRadius: 6,
  },
});
export default App;
