import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (horizontalScale(size) - size) * factor;

const TodoList = () => {
    // Hardcoded todo list
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React Native', completed: false },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Review code', completed: false },
    ]);

    // Toggle completed state
    const toggled = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.todoItem, item.completed && styles.completed]}
            onPress={() => toggled(item.id)}
        >
            <Text
                style={[
                    styles.todoText,
                    item.completed && styles.completedText,
                ]}
            >
                {item.text}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📝 Todo List</Text>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(20),
        backgroundColor: '#f7f9fc',
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: moderateScale(20),
        textAlign: 'center',
    },
    todoItem: {
        padding: moderateScale(15),
        marginVertical: verticalScale(8),
        borderRadius: moderateScale(10),
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    todoText: {
        fontSize: 18,
        color: '#333',
    },
    completed: {
        backgroundColor: '#e0ffe0',
        borderColor: '#8bc34a',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#4caf50',
    },
});

export default TodoList;
