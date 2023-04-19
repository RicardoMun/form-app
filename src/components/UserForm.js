import React, { useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export const UserForm = ({
  modalUserForm,
  setModalUserForm,
  registeredUsers,
  setRegisteredUsers,
  user: userObj,
  setUser
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [comments, setComments] = useState("");

  console.log(Object.keys(userObj));

  useEffect(() => {
    console.log("Entre al useEffect");
    console.log("info del objeto user" + userObj.id);
    if (Object.keys(userObj).length > 0) {
      console.log("Entre al condicional del useEffect");
      setId(userObj.id);
      setUserName(userObj.userName);
      setUserEmail(userObj.userEmail);
      setCellphone(userObj.cellphone);
      setComments(userObj.comments);
      setDate(userObj.fecha);
    }
  }, [userObj]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleUser = () => {
    console.log("Handling user...");

    const fields = {
      "Nombre Completo": userName,
      "Correo": userEmail,
      "Celular": cellphone,
      "Comentarios": comments,
    };

    const emptyFields = Object.entries(fields)
      .filter(([, value]) => value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      console.log("Error: Hay campos sin diligenciar:", emptyFields.join(", "));
      return;
    }


    if (![userName, userEmail, cellphone, comments].every(field => field !== "")) {
      console.log("Error: Hay campos sin diligenciar");
      setTimeout(() => {
        Alert.alert("Error", "Hay campos sin diligenciar");
      }, 100);
      return;
    }

    const newUser = {
      userName,
      userEmail,
      cellphone,
      date,
      comments,
    };

    if (id) {
      // Editar
      newUser.id = id;
      console.log("Editando", newUser);
      const userEdited = registeredUsers.map((userState) =>
        userState.id === newUser.id ? newUser : userState
      );
      setRegisteredUsers(userEdited)
      console.log(userEdited)
      setUser({})
    } else {
      // Nuevo registro
      newUser.id = Date.now();
      setRegisteredUsers([...registeredUsers, newUser]);
    }

    /*     setRegisteredUsers([...registeredUsers, newUser]); */
    setModalUserForm(!modalUserForm);

    setUserName("");
    setUserEmail("");
    setCellphone("");
    setDate(new Date());
    setComments("");
  };




  return (
    <Modal animationType="slide" visible={modalUserForm}>
      <ImageBackground
        source={require("../assets/jpg/LogIn.jpg")}
        resizeMode="cover"
        style={styles.backCover}
      >

        <ScrollView>

          <Pressable
            onPress={() => setModalUserForm(!modalUserForm)}>
            <Image style={styles.image} source={require('../assets/png/Logos_UAM-08.png')}>
            </Image>
            
          </Pressable>

          <Text style={styles.title}>
            Inscripción {""}
            <Text style={styles.titleBold}>Vacaciones UAM</Text>
          </Text>

          <View style={styles.campo}>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <TextInput
              placeholder="@autonoma.edu.co"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="email-address"
              value={userEmail}
              onChangeText={setUserEmail}
            ></TextInput>
          </View>

          <View style={styles.campo}>
            <TextInput
              placeholder="Celular"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              keyboardType="phone-pad"
              value={cellphone}
              onChangeText={setCellphone}
              maxLength={10}
            ></TextInput>
          </View>

          {/* <View style={styles.campo}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View> */}

          <View styles={styles.campo}>
            <TextInput
              placeholder="Dejanos tus comentarios"
              placeholderTextColor={"#F8F9F9"}
              style={styles.input}
              numberOfLines={6}
              multiline={true}
              value={comments}
              onChangeText={setComments}
            ></TextInput>
          </View>

          <View styles={styles.campoMapa}>
            <Text style={styles.textMapa}>¿Dónde nos encontramos?</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 5.065,
                longitude: -75.500,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 5.065,
                  longitude: -75.500,
                }}
                title="Manizales - San Jorge"
                description="Mi casita"
              />
            </MapView>
            
          </View>

          <Pressable style={styles.btnNewUser} onPress={handleUser}>
            <Text style={styles.btnTextNewUser}>Agregar</Text>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    margin: 15,
    width: 75,
    height: 75,
    marginBottom: 20,
  },
  backCover: {
    position: 'absolute',
    marginTop: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.9,
  },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 94,
  },
  titleBold: {
    fontWeight: 'bold',

  },

  textMapa: {
    fontSize: 20,
    color: 'black',
    marginBottom: 8,
    marginTop: 12,
    textAlign: 'center',
  },

  map: {
    padding: 20,
    width: 300,
    height: 300,
  },

  input: {
    justifyContent: 'center',
    paddingHorizontal: 32,
    color: 'rgba(26, 26, 26, 0.8)',
    backgroundColor: 'rgba(39, 39, 39, 0.2)',
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 8,
    marginTop: 12,
  },
  campo: {
    padding: 20,
  },
  inputCommnets: {
    height: 100,
  },
  inputDate: {
    textAlign: "center",
  },
  btnExit: {
    backgroundColor: '#F4D73B',
    borderRadius: 10,
    padding: 20,
    margin: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#8A8A8A',
  },

  btnNewUser: {
    backgroundColor: '#F4D73B',
    borderRadius: 10,
    padding: 20,
    margin: 70,
  },
  btnTextNewUser: {
    textAlign: 'center',
    fontSize: 18,
    color: '#8A8A8A',
  },
});
