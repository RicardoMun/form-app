import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const User = ({ item, setModalUserForm, editUser, eliminatedUser }) => {
    const { userName, date, id } = item;
    const dateFormate = (date) => {
        const newDate = new Date(date);
        const optionsFormate = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return newDate.toLocaleDateString("es-ES", optionsFormate);
    };
    console.log(item);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Estudiante</Text>
                <Text style={styles.text}>{userName}</Text>
                <Text style={styles.date_format}>{dateFormate(date)}</Text>
                <View style={styles.buttons}>
                    <Pressable style={[styles.btn, styles.btnEdit]} 
                        onPress = {() => {
                            setModalUserForm(true)
                            editUser(id)
                        }}

                        >
                        <Text style={styles.text}>Editar</Text>
                    </Pressable>
                    <Pressable style={[styles.btn, styles.btnDeleteOne]}
                        onPress = {() => {
                            eliminatedUser(id)
                        }}
                    >
                        <Text style={styles.text}>Eliminar</Text>
                    </Pressable>

                </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    content: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    label: {
        textTransform: "uppercase",
        fontWeight: "700",
        color: "#F4D73B",
        marginBottom: 5,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
    },
    date_format: {
        color: "#FFFFFF",
        fontSize: 14,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btnEdit: {
        backgroundColor: "#0090D0"
    },
    btnDeleteOne: {
        backgroundColor: "#E63D17"
    }

});
