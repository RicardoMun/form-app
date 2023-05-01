import React, {useState} from 'react';
import  { UserForm }  from './src/components/UserForm';
import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { User } from './src/components/User';
import { UserInfo } from './src/components/UserInfo';
/* import { ExampleForm } from './src/components/ExampleForm';
import { Book } from './src/components/Book'; */

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUserForm, setModalUserForm] = useState(false);
  /* const [modalExampleForm,setModalExampleForm] = useState(false) */
  /* Creamos un array vacio par listar los usuarios */
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState({});
  const [modalUser, setModalUser] = useState(false);


  const [dataArray,setdataArray] = useState([]);
  /* const [book, setBook] = useState({}) */


  const editUser = (id) => {
    console.log("usuario",id);
    const editUser = registeredUsers.filter((user)=> user.id === id);
    setUser(editUser[0])
    console.log(editUser[0]);
  }

  const eliminateUser = (id) => {
    Alert.alert(
      "Deseas eliminar este usuario?",
      "Esta accion no se puede deshacer",
      [
        { text: "Cancelar" },
        { text: "Eliminar",
          onPress: () => {
            console.log("Eliminando",id);
            const editUser = registeredUsers.filter((user)=> user.id !== id);
            setRegisteredUsers(editUser);
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Registrate en la {""}
        <Text style={styles.titleBold}>UAM</Text>
      </Text>

      <Pressable onPress={() => {setModalUserForm(true)}} style = {styles.btnNewUser}>
        <Text style = {styles.titleButton}>Nuevo Usuario</Text>
      </Pressable>
      {
        registeredUsers.length === 0 ? (
          <Text style = {styles.textNoUser}>No hay usuarios Registrados</Text>
        ) : (
          <FlatList
            data = {registeredUsers}
            keyExtractor = {(item) => item.id}
            renderItem={ ({item}) => {
              return <User 
                item = {item} 
                setModalUserForm = {setModalUserForm}
                user = {user}
                editUser = {editUser}
                eliminatedUser = {eliminateUser}
                setUser = {setUser}
                setModalUser = {setModalUser}
              />
            }}
          />
        )
      }
      <UserForm 
        modalUserForm={modalUserForm} 
        setModalUserForm={setModalUserForm}
        registeredUsers = {registeredUsers}
        setRegisteredUsers = {setRegisteredUsers}
        user = {user}
        setUser = {setUser}
      ></UserForm>

      <Modal animationType='fade' visible={modalUser}>
        <UserInfo></UserInfo>
      </Modal>


      {/* <Pressable onPress={() => {setModalExampleForm(true)}} style = {styles.btnNewUser}>
        <Text style = {styles.title}>Nuevo Libro</Text>
      </Pressable>
      {
        dataArray.length === 0 ? (
          <Text style = {styles.textNoUser}>No hay Libros Registrados</Text>
        ) : (
          <FlatList
            style = {styles.userList}
            data = {dataArray}
            keyExtractor = {(item) => item.id}
            renderItem={ ({item}) => {
              console.log(item);
              return <Book item = {item} 
              setModalExampleForm={setModalExampleForm}
              editBook={editBook}
              eliminateBook={eliminateBook}
              />
            }}
          />
        )
      }
      <ExampleForm 
        modalExampleForm={modalExampleForm}
        setModalExampleForm={setModalExampleForm}
        dataArray={dataArray}
        setdataArray={setdataArray}
        book={book}
        setBook={setBook}
      />
      

      <Modal animationType='slide' visible={modalVisible}>
        <Text>Desde Modal</Text>
      </Modal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor : "#0069a3",
    flex : 1
  },
  title : {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    paddingTop: 35,
  },
  titleBold : {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4D73B',
  },
  btnNewUser : {
    backgroundColor: '#F4D73B',
    borderRadius: 10,
    margin: 50,
    padding: 10,
    color: 'red',
  },
  titleButton:{
    textAlign: 'center',
    fontSize: 18,
    color: '#8A8A8A',
  },
  userList : {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    margin: 70,
  },
  textNoUser : {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFF',
    paddingTop: 35,
  }
});

