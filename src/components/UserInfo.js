import React from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';


export const UserInfo = ({ user, setModalUser }) => {
    console.log(user);
    return (
        <SafeAreaView style={styles.content}>
            <View>
                <Pressable style={styles.btnExit} onPress={() => setModalUser(false)}>
                    <Text style={styles.exitText}>X</Text>
                </Pressable>
            </View>

            <Text style={styles.tittle}> Información del Usuario</Text>

            <View style={styles.cardContent}>
                <Text style={styles.label}>Estudiante</Text>
                <Text style={styles.text}>{user.userName}</Text>

                <Text style={styles.label}>Correo</Text>
                <Text style={styles.text}>{user.userEmail}</Text>
                
                <Text style={styles.label}>Celular</Text>
                <Text style={styles.text}>{user.cellphone}</Text>
                
                <Text style={styles.label}>Comentarios</Text>
                <Text style={styles.text}>{user.comments}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000099",
    },
    cardContent: {
        backgroundColor: "#fff",
        width: "90%",
        padding: 20,
        borderRadius: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#F4D73B",
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        color: "#000",
        marginBottom: 10,
    },
    btnExit: {
        backgroundColor: "#F4D73B",
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
        right: 10,
    },
    exitText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },


})
