import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [inputTexto, setInputTexto] = useState('');
  const [nombreStorage, setNombreStorage] = useState('');

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      setNombreStorage(inputTexto);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setNombreStorage('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={styles.contenedor}>
        {nombreStorage ? <Text>Hola: {nombreStorage}</Text> : null}
        <TextInput
          onChangeText={texto => setInputTexto(texto)}
          placeholder="Escribe tu nombre"
          style={styles.input}
        />
        <Button title="Guardar" color="#333" onPress={() => guardarDatos()} />
        {nombreStorage ? (
          <TouchableHighlight
            onPress={() => eliminarDatos()}
            style={styles.btnEliminar}>
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 20,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
